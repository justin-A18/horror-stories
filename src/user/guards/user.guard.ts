import {
  InternalServerErrorException,
  UnauthorizedException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';

import { Request } from 'express';

import { Decoded } from '../interfaces/token.interface';
import { JwtAdapter } from 'src/config/adapters/jwt.adapter';
import { User } from 'src/user/schema/user.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface CustomRequest extends Request {
  user: User;
}

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtAdapter: JwtAdapter,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<CustomRequest>();
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('No token provided');
    }

    if (!authorization.startsWith('Bearer '))
      throw new UnauthorizedException('Invalid Bearer token');

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await this.jwtAdapter.verifyToken<Decoded>(token);
      if (!payload) throw new UnauthorizedException('Invalid token');

      const user = await this.userModel.findOne({
        email: payload.email,
      });

      if (!user) throw new UnauthorizedException('Invalid token - user');

      req.user = user;

      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
