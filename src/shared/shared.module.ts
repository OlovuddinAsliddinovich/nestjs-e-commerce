import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/models/user.schema';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception-filter';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  providers: [UserService, 
    {
      provide:APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
  exports: [UserService],
})
export class SharedModule {}
