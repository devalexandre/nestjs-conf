import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {Observable} from "rxjs";

@Injectable()
export class AppService {
  constructor( @Inject('AUTH_SERVICE') private client: ClientProxy) {}

  login(email:string , password: string): Observable<any> {
    const payload = {email, password}
    return this.client.send({cmd:'auth.login'},payload)
  }
}
