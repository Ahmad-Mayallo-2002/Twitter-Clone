import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { verify, VerifyErrors } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
      return res.status(403).json({ msg: 'Token is not Found or Expired' });
    verify(token, 'jwt', (err: VerifyErrors) => {
      if (err) return res.status(500).json({ msg: err.message });
      next();
    });
  }
}
