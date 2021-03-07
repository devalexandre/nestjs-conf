import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import {UserType} from "./@types/user";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'auth.login' })
  login(user:UserType): Promise<{ access_token: string }> {
    return this.appService.login({email: user.email, password: user.password});
  }
}
