import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: any) {
    return sign(payload, 'secretkey', { expiresIn: '7h' });
  }

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }
}
