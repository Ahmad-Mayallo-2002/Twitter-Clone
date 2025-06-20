import { Injectable } from '@nestjs/common';
import { pool } from '../db';
import { Response } from 'express';
import { TweetRequestBody } from 'src/types';

@Injectable()
export class TweetsService {
  getAll(res: Response) {
    pool.query('SELECT * FROM tweets', (err, result) => {
      if (err) return res.status(500).json({ err: err.message });
      if (!result.rowCount) return res.status(404).json({ msg: 'No Tweets!' });
      return res.status(200).json(result.rows);
    });
  }

  getById(res: Response, Params: { id: string }) {
    pool.query(
      'SELECT * FROM tweets WHERE id=$1',
      [Params.id],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (!result.rows[0])
          return res.status(404).json({ msg: 'Tweet is not Found!' });
        return res.status(200).json(result.rows[0]);
      },
    );
  }

  deleteOne(req: Request, res: Response, Params: { id: string }) {
    pool.query(
      'SELECT * FROM tweets WHERE id = $1',
      [Params.id],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (!result.rowCount)
          return res.status(404).json({ msg: 'Tweet is not Found!' });
        pool.query(
          'DELETE FROM tweets WHERE id = $1',
          [Params.id],
          (err, result) => {
            if (err) return res.status(500).json({ err: err.message });
            return res.status(200).json({ msg: 'Tweet is Deleted!' });
          },
        );
      },
    );
  }

  createOne(req: Request, res: Response, body: TweetRequestBody) {
    pool.query(
      'INSERT INTO tweets (author, content) VALUES ($1, $2)',
      [req.headers['author'], body.content],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        return res.status(201).json({ msg: 'Tweet is Done!' });
      },
    );
  }

  updateOne(res: Response, Params: { id: string }, body: TweetRequestBody) {
    pool.query(
      'SELECT * FROM tweets WHERE id = $1',
      [Params.id],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (!result.rowCount)
          return res.status(404).json({ msg: 'Tweet is not Found!' });
        pool.query(
          'UPDATE tweets SET content = $1 WHERE id = $2',
          [body.content, Params.id],
          (err, result) => {
            if (err) return res.status(500).json({ err: err.message });
            return res.status(200).json({ msg: 'Tweet is Updated!' });
          },
        );
      },
    );
  }
}
