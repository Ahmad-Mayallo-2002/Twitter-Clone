import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { TweetsModule } from './modules/tweets.module';
import { RepliesModule } from './modules/replies.module';
import { LikesModule } from './modules/likes.module';
import { FollowsModule } from './modules/follows.module';

@Module({
  imports: [
    UserModule,
    TweetsModule,
    RepliesModule,
    LikesModule,
    FollowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
