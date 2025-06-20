import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { RepliesService } from '../services/replies.service';
import { Response } from 'express';
import { ReplyRequestBody } from 'src/types';

@Controller('api')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Get('/get-tweet-replies/:tweetId')
  getTweetReplies(@Param() Params: { tweetId: string }, @Res() res: Response) {
    return this.repliesService.getTweetReplies(Params, res);
  }

  @Get('/get-reply/:replyId')
  getReply(@Param() Params: { replyId: string }, @Res() res: Response) {
    return this.repliesService.getReply(Params, res);
  }

  @Delete('/delete-reply/:replyId')
  deleteReply(
    @Param() Params: { replyId: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.repliesService.deleteReply(Params, req, res);
  }

  @Put('/update-reply/:replyId')
  updateReply(
    @Param() Params: { replyId: string },
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ReplyRequestBody,
  ) {
    return this.repliesService.updateReply(Params, req, res, body);
  }

  @Post('/create-reply/:tweetId')
  createReply(
    @Param() Params: { tweetId: string },
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ReplyRequestBody,
  ) {
    return this.repliesService.createReply(Params, req, res, body);
  }
}
