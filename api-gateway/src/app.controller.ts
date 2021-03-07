import {Body, Controller, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async login(@Body('email') email:string ,@Body('password') password:string){
    const auth =  await this.appService.login(email,password).toPromise()

    console.log("AUTH",auth)

    return auth
  }
}
