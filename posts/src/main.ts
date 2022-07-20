import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { natsWrapper, QueueGroup } from '@zhytomyr_war_elefant/common';
import * as uuid from 'uuid';
import { CustomStrategy } from '@nestjs/microservices';
import { Listener } from '@nestjs-plugins/nestjs-nats-streaming-transport'

async function bootstrap() {
  const options: CustomStrategy = {
    strategy: new Listener(
      'pet_project_microservices' /* clusterID */,
      `post-${uuid.v4()}` /* clientID */,
      QueueGroup.PostService, /* queueGroupName */
      {
        url: 'http://nats-srv:4222'
      } /* TransportConnectOptions */,
      {
        durableName: QueueGroup.PostService,
        manualAckMode: true,
        deliverAllAvailable: true,
      } /* TransportSubscriptionOptions */ ,
    ),
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', true)
  app.enableCors()
  app.use(json())
  app.setGlobalPrefix('posts')
  const microService = app.connectMicroservice(options);
  microService.listen()

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined');
  }
  
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined')
  }

  try {
    await natsWrapper.connect('pet_project_microservices', `posts-${uuid.v4()}`, 'http://nats-srv:4222');

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    })

    process.on('SIGINT', () => natsWrapper.client.close()); // if restart we will immediately close connection 
    process.on('SIGTERM', () => natsWrapper.client.close()); // if we terminate we will immidiately close connection

    console.log('Posts connected to NATS streaming');
    
  //   await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
  //   console.log('connected to MongoDB');
    
  } catch (err) {
    console.log(err);
    
  }


  await app.listen(4003, () => {
    console.log('Profile listening on 4003');
  });
}
bootstrap();

