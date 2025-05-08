import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from 'src/dto/login.dto';
import { RegisterDTO } from 'src/dto/register.dto';
import { User } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private omitPassword(username: string) {
    return this.userModel.findOne({ username }).select('-password');
  }

  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;

    const user = await this.userModel.findOne({ username });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.UNAUTHORIZED);
    }

    const createUser = await this.userModel.create(userDTO);

    await createUser.save();

    return this.omitPassword(username);
  }

  async login(userDTO: LoginDTO) {
    const { username, password } = userDTO;

    const findUser = await this.userModel.findOne({ username });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, findUser.password)) {
      return this.omitPassword(username);
    } else {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: any) {
    const { username } = payload;
    return await this.userModel.findOne({username});
  }

  
}
