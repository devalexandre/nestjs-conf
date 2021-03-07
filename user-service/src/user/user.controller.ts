import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import {UserDocument} from "./user.model";
import {UserType} from "./@types/user";


@Controller()
export class UserController {
  constructor(private  userService: UserService) {}

  @MessagePattern({ cmd: 'find' })
  find(user:UserType): Promise<UserDocument> {

    return this.userService.find(user.email, user.password);
  }
}
