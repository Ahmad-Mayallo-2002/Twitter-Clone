import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TweetsController } from '../controllers/tweets.controller';
import { TweetsService } from '../services/tweets.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  providers: [TweetsService],
  controllers: [TweetsController],
})
export class TweetsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        '/api/delete-tweet/:id',
        '/api/create-tweet',
        '/api/update-tweet/:id',
      );
  }
}
