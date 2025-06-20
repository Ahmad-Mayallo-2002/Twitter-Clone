import { Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { FollowsService } from '../services/follows.service';
import { Response } from 'express';

@Controller('api')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post('/add-follow/:userId')
  addFollow(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: { userId: string },
  ) {
    return this.followsService.addFollow(req, res, params);
  }

  @Delete('/cancel-follow/:userId')
  cancelFollow(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: { userId: string },
  ) {
    return this.followsService.cancelFollow(req, res, params);
  }

  @Get('/get-followings')
  getUserFollowings(@Res() res: Response) {
    return this.followsService.getUserFollowings(res);
  }
}
