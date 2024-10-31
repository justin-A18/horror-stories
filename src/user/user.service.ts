import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.shema';
import { Model } from 'mongoose';
import { JwtAdapter } from 'src/config/adapters/jwt.adapter';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtAdapter: JwtAdapter,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findbyEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async register(registerUserDto: RegisterUserDto) {
    const isExistUser = await this.findbyEmail(registerUserDto.email);

    if (isExistUser) {
      throw new BadRequestException('Email already exists');
    }

    const user = new this.userModel(registerUserDto);
    const token = await this.jwtAdapter.generateToken({
      id: user.id,
      email: user.email,
    });

    if (!token) {
      throw new InternalServerErrorException('Error generating token');
    }

    await user.save();

    return {
      message: 'User created successfully',
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findbyEmail(loginUserDto.email);

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    const token = await this.jwtAdapter.generateToken({
      id: user.id,
      email: user.email,
    });

    if (!token) {
      throw new InternalServerErrorException('Error generating token');
    }

    return {
      name: user.name,
      email: user.email,
      token,
    };
  }
}
