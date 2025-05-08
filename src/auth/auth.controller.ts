import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from '../dto/register.dto';
import { LoginDTO } from '../dto/login.dto';
import { UserService } from '../shared/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);

    const payload = {
      username: user?.username,
    };

    const token = await this.authService.signPayload(payload);

    return {
      user,
      token,
    };
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.login(userDTO);

    const payload = {
      username: user?.username,
    };

    const token = await this.authService.signPayload(payload);

    return {
      user,
      token,
    };
  }

  @Get('check')
  @UseGuards(AuthGuard('jwt'))
  async check() {
    return 'authorized';
  }
}
