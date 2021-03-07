import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://192.168.1.3:5672'],
        queue: 'auth_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
