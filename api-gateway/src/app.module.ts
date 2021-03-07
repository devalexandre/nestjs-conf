import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";


@Module({
  imports: [
    ClientsModule.register([
      { name: 'AUTH_SERVICE', transport: Transport.RMQ ,
        options:{
          urls:['amqp://192.168.1.3:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          }
      }},
      { name: 'USER_SERVICE', transport: Transport.RMQ,
        options:{
          urls:['amqp://192.168.1.3:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          }
      } },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})

// @ts-ignore
export class AppModule {}