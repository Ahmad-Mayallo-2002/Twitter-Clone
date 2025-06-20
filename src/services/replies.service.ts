import { Injectable, Param } from '@nestjs/common';
import { Response } from 'express';
import { pool } from '../db';
import { ReplyRequestBody } from 'src/types';

@Injectable()
export class RepliesService {
  getTweetReplies(Params: { tweetId: string }, res: Response) {
    pool.query(
      'SELECT * FROM replies WHERE tweet = $1',
      [Params.tweetId],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (!result.rowCount)
          return res.status(404).json({ msg: 'No Replies Yet!' });
        return res.status(200).json(result.rows);
      },
    );
  }

  getReply(Params: { replyId: string }, res: Response) {
    pool.query(
      'SELECT * FROM replies WHERE id=$1',
      [Params.replyId],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        if (!result.rowCount)
          return res.status(404).json({ msg: 'This Reply is not Found!' });
        return res.status(200).json(result.rows[0]);
      },
    );
  }

  deleteReply(Params: { replyId: string }, req: Request, res: Response) {
    pool.query(
      'DELETE FROM replies WHERE id = $1 AND user_id = $2',
      [Params.replyId, req.headers['id']],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        return res.status(200).json({ msg: 'Reply is Deleted!' });
      },
    );
  }

  updateReply(
    Params: { replyId: string },
    req: Request,
    res: Response,
    body: ReplyRequestBody,
  ) {
    pool.query(
      'UPDATE replies SET content = $1 WHERE id = $2 AND user_id = $3',
      [body.content, Params.replyId, req.headers['user_id']],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        return res.status(200).json({ msg: 'Reply is Updated!' });
      },
    );
  }

  createReply(
    Params: { tweetId: string },
    req: Request,
    res: Response,
    body: ReplyRequestBody,
  ) {
    pool.query(
      'INSERT INTO replies (user_id, tweet, content) VALUES ($1, $2, $3)',
      [req.headers['user_id'], Params.tweetId, body.content],
      (err, result) => {
        if (err) return res.status(500).json({ err: err.message });
        return res.status(201).json({ msg: 'Reply is Done!' });
      },
    );
  }
}
