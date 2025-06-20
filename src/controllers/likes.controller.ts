import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { LikesService } from '../services/likes.service';
import { Response, response } from 'express';

@Controller('api')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('/add-like/:tweetId')
  addLike(
    @Req() req: Request,
    @Res() res: Response,
    @Param()
    params: {
      tweetId: string;
    },
  ) {
    return this.likesService.addLike(req, res, params);
  }

  @Post('/add-dislike/:tweetId')
  addDislike(
    @Req() req: Request,
    @Res() res: Response,
    @Param()
    params: {
      tweetId: string;
    },
  ) {
    return this.likesService.addDislike(req, res, params);
  }

  @Get('/get-tweet-likes/:tweetId')
  getTweetLikes(@Res() res: Response, @Param() params: { tweetId: string }) {
    return this.likesService.getTweetLikes(res, params);
  }

  @Get('/get-tweet-dislikes/:tweetId')
  getTweetDislikes(@Res() res: Response, @Param() params: { tweetId: string }) {
    return this.likesService.getTweetDislikes(res, params);
  }
}
