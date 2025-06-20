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
import { UserService } from '../services/user.service';
import { UserRequestBody } from '../types';
import { Response } from 'express';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Res() res: Response, @Body() body: UserRequestBody) {
    return this.userService.login(res, body);
  }

  @Post('/sign-up')
  async signUp(@Res() res: Response, @Body() body: UserRequestBody) {
    return this.userService.signUp(res, body);
  }

  @Delete('/delete-user/:id')
  async deleteOne(@Param() Param: any, @Res() res: Response) {
    return this.userService.deleteUser(Param, res);
  }

  @Put('/update-user/:id')
  async updateOne(
    @Res() res: Response,
    @Body() body: UserRequestBody,
    @Param() Param: any,
  ) {
    return this.userService.updateOne(Param, res, body);
  }

  @Get('get-users')
  async getAll(@Param() Param: any, @Res() res: Response) {
    return this.userService.getAll(Param, res);
  }

  @Get('get-users/:id')
  async get(@Param() Param: any, @Res() res: Response) {
    return this.userService.getById(Param, res);
  }
}
