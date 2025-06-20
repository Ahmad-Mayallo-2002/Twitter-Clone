import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FollowsController } from '../controllers/follows.controller';
import { FollowsService } from '../services/follows.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  providers: [FollowsService],
  controllers: [FollowsController],
})
export class FollowsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        '/api/add-follow/:userId',
        '/api/cancel-follow/:userId',
        '/api/get-followings',
      );
  }
}
