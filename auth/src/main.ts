import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { natsWrapper } from '@zhytomyr_war_elefant/common';
import * as uuid from 'uuid';
import { Listener } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { CustomStrategy } from '@nestjs/microservices';

async function bootstrap() {
  // const options: CustomStrategy = {
  //   strategy: new Listener(
  //     'my-cluster' /* clusterID */,
  //     'user-service-listener' /* clientID */,
  //     'user-service-group', /* queueGroupName */
  //     {
  //       url: 'http://127.0.0.1:4222'
  //     } /* TransportConnectOptions */,
  //     {
  //       durableName: 'user-queue-group',
  //       manualAckMode: true,
  //       deliverAllAvailable: true,
  //     } /* TransportSubscriptionOptions */ ,
  //   ),
  // };

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', true)
  app.enableCors()
  app.use(json())
  app.setGlobalPrefix('auth')

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined')
  }

  try {
    await natsWrapper.connect('pet_project_microservices', `auth-${uuid.v4()}`, 'http://nats-srv:4222');

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    })

    process.on('SIGINT', () => natsWrapper.client.close()); // if restart we will immediately close connection 
    process.on('SIGTERM', () => natsWrapper.client.close()); // if we terminate we will immidiately close connection

    console.log('Auth connected to NATS streaming');
    
  //   await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
  //   console.log('connected to MongoDB');
    
  } catch (err) {
    console.log(err);
  }

  await app.listen(4000, () => {
    console.log('Auth listening on port 4000');
  })
}
bootstrap();
