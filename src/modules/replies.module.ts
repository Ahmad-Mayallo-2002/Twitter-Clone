import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RepliesController } from '../controllers/replies.controller';
import { RepliesService } from '../services/replies.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  providers: [RepliesService],
  controllers: [RepliesController],
})
export class RepliesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        '/api/delete-reply/:replyId',
        '/api/update-reply/:replyId',
        '/api/create-reply/:tweetId',
      );
  }
}
