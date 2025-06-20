import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LikesController } from '../controllers/likes.controller';
import { LikesService } from '../services/likes.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/api/add-like/:tweetId', '/api/add-dislike/:tweetId');
  }
}
