import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { pool } from '../db';

@Injectable()
export class FollowsService {
  addFollow(req: Request, res: Response, params: { userId: string }) {
    pool.query(
      'INSERT INTO follows (follower, followings) VALUES ($1, $2)',
      [req.headers['id'], params.userId],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        return res.status(201).json({ msg: 'Follow is Added!' });
      },
    );
  }

  cancelFollow(req: Request, res: Response, params: { userId: string }) {
    pool.query(
      'DELETE FROM follows WHERE follower = $1 AND followings = $2',
      [req.headers['id'], params.userId],
      (err) => {
        if (err) return res.status(500).json({ err: err.message });
        return res.status(200).json({ msg: 'Following is Canceled!' });
      },
    );
  }

  getUserFollowings(res: Response) {
    pool.query(
      'SELECT users.username, users.name, users.avatar, follows.id FROM users JOIN follows ON followings = users.id',
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (!result.rows) return res.status(404).json({ msg: 'Not Found!' });
        return res.status(200).json(result.rows);
      },
    );
  }
}
