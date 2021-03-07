import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({secret:'nestjs_conf'}),
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.RMQ,
        options:{
          urls:['amqp://192.168.1.3:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          }
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
