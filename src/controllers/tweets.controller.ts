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
import { Response } from 'express';
import { TweetsService } from '../services/tweets.service';
import { TweetRequestBody } from 'src/types';

@Controller('api')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Get('/get-tweets')
  getAll(@Res() res: Response) {
    return this.tweetsService.getAll(res);
  }

  @Get('/get-tweets/:id')
  getById(@Res() res: Response, @Param() Params: { id: string }) {
    return this.tweetsService.getById(res, Params);
  }

  @Delete('/delete-tweet/:id')
  deleteOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param() Param: { id: string },
  ) {
    return this.tweetsService.deleteOne(req, res, Param);
  }

  @Post('/create-tweet')
  createOne(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: TweetRequestBody,
  ) {
    return this.tweetsService.createOne(req, res, body);
  }

  @Put('/update-tweet/:id')
  updateOne(
    @Res() res: Response,
    @Body() body: TweetRequestBody,
    @Param() Params: { id: string },
  ) {
    return this.tweetsService.updateOne(res, Params, body);
  }
}
