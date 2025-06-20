import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        '/api/get-users',
        '/api/get-users/:id',
        '/api/delete-user/:id',
        '/api/update-user/:id',
      );
  }
}
