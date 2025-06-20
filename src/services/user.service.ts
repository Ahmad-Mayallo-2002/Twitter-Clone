import { Body, Injectable, Res } from '@nestjs/common';
import { pool } from '../db';
import { UserRequestBody } from 'src/types';
import { Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { QueryResult } from 'pg';
import { log } from 'console';

@Injectable()
export class UserService {
  async login(res: Response, body: UserRequestBody) {
    const { email, password } = body;
    pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email],
      async (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (!result.rowCount)
          return res.status(404).json({ msg: 'Invalid Email!' });
        const hashPassword = await compare(password, result.rows[0].password);
        if (!hashPassword)
          return res.status(404).json({ msg: 'Invalid Password!' });
        const token = sign(
          {
            email,
            password,
            username: result.rows[0].username,
          },
          'jwt',
          {
            expiresIn: '1d',
          },
        );
        return res
          .cookie(
            'token',
            JSON.stringify({
              token,
              role: result.rows[0].role,
              id: result.rows[0].id,
            }),
          )
          .json({ msg: 'Login is Done!', x: { token, id: result.rows[0].id } });
      },
    );
  }

  async signUp(res: Response, body: UserRequestBody) {
    const { username, email, name, bio, location, password } = body;
    const result: QueryResult<UserRequestBody> = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email],
    );
    if (result.rowCount)
      return res.status(404).json({ msg: 'This Email is Already Exist!' });
    const hashPassword = await hash(password, 10);
    pool.query(
      'INSERT INTO users (username, email, name, bio, location, password) VALUES ($1,$2,$3,$4,$5,$6)',
      [username, email, name, bio, location, hashPassword],
      (err, result) => {
        if (err) return res.status(500).json({ msg: err.message });
        return res.status(201).json({ msg: 'SignUp is Done!' });
      },
    );
  }

  async deleteUser(Param: any, res: Response) {
    pool.query('DELETE FROM users WHERE id=$1', [Param.id], (err, result) => {
      if (err) return res.status(404).json({ msg: 'This User is not Exist!' });
      return res.status(200).json({ msg: 'Deleted is Done!' });
    });
  }

  async getAll(Param: any, res: Response) {
    pool.query('SELECT * FROM users', (err, result) => {
      if (err) return res.status(404).json(result.rows);
      return res.status(200).json(result.rows);
    });
  }

  async getById(Param: any, res: Response) {
    pool.query('SELECT * FROM users WHERE id=$1', [Param.id], (err, result) => {
      if (err) return res.status(404).json({ msg: 'This User is not Found!' });
      return res.status(200).json(result.rows[0]);
    });
  }

  async updateOne(Param: any, res: Response, body: UserRequestBody) {
    const bodyArray: string[] = [];
    let counter: number = 0;
    let set: string[] = [];
    ['username', 'name', 'bio', 'location', 'password', 'email'].forEach(
      (val) => {
        if (body[val]) {
          counter++;
          set.push(`${val} = $${counter}`);
          if (val !== 'email' && val !== 'password') bodyArray.push(body[val]);
        }
      },
    );
    if (body.email) {
      pool.query(
        'SELECT * FROM users WHERE email = $1',
        [body.email],
        (err, result) => {
          if (err) return res.status(500).json({ err: err.message });
          if (result.rowCount)
            return res.status(400).json({ msg: 'This User is Already Exist' });
        },
      );
      bodyArray.push(body.email);
    }
    if (body.password) {
      counter++;
      const hashPassword = await hash(body.password, 10);
      bodyArray.push(hashPassword);
    }
    counter++;
    pool.query(
      `UPDATE users SET ${set.join(', ')} WHERE id=$${counter}`,
      [...bodyArray, Param.id],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        return res.status(200).json({ msg: 'Done!' });
      },
    );
  }
}
