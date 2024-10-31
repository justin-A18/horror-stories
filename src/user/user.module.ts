import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.shema';
import { UserGuard } from './guards/user.guard';
import { JwtAdapter } from 'src/config/adapters/jwt.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAdapter, UserGuard],
  exports: [MongooseModule, UserGuard, JwtAdapter],
})
export class UserModule {}
