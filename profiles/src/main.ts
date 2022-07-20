import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import * as uuid from 'uuid';

import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { natsWrapper, QueueGroup } from '@zhytomyr_war_elefant/common';
import { CustomStrategy } from '@nestjs/microservices';
import { Listener } from '@nestjs-plugins/nestjs-nats-streaming-transport';

async function bootstrap() {
  const options: CustomStrategy = {
    strategy: new Listener(
      'pet_project_microservices' /* clusterID */,
      `profile-${uuid.v4()}` /* clientID */,
      QueueGroup.ProfileService, /* queueGroupName */
      {
        url: 'http://nats-srv:4222'
      } /* TransportConnectOptions */,
      {
        durableName: QueueGroup.ProfileService,
        manualAckMode: true,
        deliverAllAvailable: true,
      } /* TransportSubscriptionOptions */ ,
    ),
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', true)
  app.enableCors()
  app.use(json())
  app.setGlobalPrefix('profile')

  const microService = app.connectMicroservice(options)
  microService.listen()

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined')
  }
  
  try {
    await natsWrapper.connect('pet_project_microservices', `profile-${uuid.v4()}`, 'http://nats-srv:4222');

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    })

    process.on('SIGINT', () => natsWrapper.client.close()); // if restart we will immediately close connection 
    process.on('SIGTERM', () => natsWrapper.client.close()); // if we terminate we will immidiately close connection

    console.log('Profiles to NATS streaming');
  } catch (err) {
    console.log(err);
  }

  await app.listen(4002, () => {
    console.log('Auth listening on port 4002');
  })
}
bootstrap();
