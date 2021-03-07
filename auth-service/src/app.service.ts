import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserType } from './@types/user';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private client: ClientProxy,
    private jwtService: JwtService,
  ) {}

  validateUser(email: string, password: string): Observable<UserType> {
    const pattern = { cmd: 'find' };
    const payload = { email, password };
    return this.client.send(pattern, payload);
  }

  async login({email, password}) {

    const user = await this.validateUser(email, password).toPromise();

    if(user){
      const payload = { username: user.email, sub: user._id };
      return {
        msg: 'Success',
        access_token: await this.jwtService.sign(payload),
      };
    }

    return {
      access_token: null,
      msg: "Usuario Não encontrado",
    };
  }
}
