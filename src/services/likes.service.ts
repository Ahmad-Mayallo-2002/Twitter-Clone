import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { pool } from '../db';
import { Response } from 'express';

@Injectable()
export class LikesService {
  addLike(req: Request, res: Response, params: { tweetId: string }) {
    const valuesArray = [params.tweetId, req.headers['user_id']];
    // Check Current Tweet Like Exist or not
    pool.query(
      'SELECT * FROM likes WHERE tweet = $1 AND user_id = $2',
      valuesArray,
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        // If not Exist add new one and remove dislike
        if (!result.rowCount) {
          // Add Like
          pool.query(
            'INSERT INTO likes (tweet, user_id) VALUES ($1, $2)',
            valuesArray,
            (err) => {
              if (err) return res.status(500).json({ err: err.message });
              return res.status(201).json({ msg: 'Add Like!' });
            },
          );
          //   Remove Dislike
          pool.query(
            'DELETE FROM dislikes WHERE tweet = $1 AND user_id = $2',
            valuesArray,
            (err) => {
              if (err) return res.status(500).json({ err: err.message });
            },
          );
        }
        // If Exist Remove It
        else {
          pool.query(
            'DELETE FROM likes WHERE tweet = $1 AND user_id = $2',
            valuesArray,
            (err, result) => {
              if (err) return res.status(500).json({ err: err.message });
              return res.status(200).json({ msg: 'Remove Like!' });
            },
          );
        }
      },
    );
  }

  addDislike(req: Request, res: Response, params: { tweetId: string }) {
    const valuesArray = [params.tweetId, req.headers['user_id']];
    // Check Current Tweet Dislike Exist or not
    pool.query(
      'SELECT * FROM dislikes WHERE tweet = $1 AND user_id = $2',
      valuesArray,
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        // If not Exist add new one and remove dislike
        if (!result.rowCount) {
          // Add Dislike
          pool.query(
            'INSERT INTO dislikes (tweet, user_id) VALUES ($1, $2)',
            valuesArray,
            (err) => {
              if (err) return res.status(500).json({ err: err.message });
            },
          );
          //   Remove Like
          pool.query(
            'DELETE FROM likes WHERE tweet = $1 AND user_id = $2',
            valuesArray,
            (err) => {
              if (err) return res.status(500).json({ err: err.message });
            },
          );
        }
        // If Exist Remove It
        else {
          pool.query(
            'DELETE FROM dislikes WHERE tweet = $1 AND user_id = $2',
            valuesArray,
            (err) => {
              if (err) return res.status(500).json({ err: err.message });
              return res.status(200).json({ msg: 'Remove Like!' });
            },
          );
        }
      },
    );
  }

  getTweetLikes(res: Response, params: { tweetId: string }) {
    pool.query(
      'SELECT * FROM likes WHERE tweet = $1',
      [params.tweetId],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        return res.status(200).json({ count: result.rowCount });
      },
    );
  }

  getTweetDislikes(res: Response, params: { tweetId: string }) {
    pool.query(
      'SELECT * FROM dislikes WHERE tweet = $1',
      [params.tweetId],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        return res.status(200).json({ count: result.rowCount });
      },
    );
  }
}
