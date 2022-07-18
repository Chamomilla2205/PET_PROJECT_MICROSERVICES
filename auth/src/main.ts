import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { natsWrapper } from './nats-wrapper';

async function bootstrap() {
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

  // await natsWrapper.connect('pet_project_microservices', 'adsasd', 'http://nats-srv:4222')

  // try {
  //   await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
  //   console.log('connected to MongoDB');
    
  // } catch (err) {
  //   console.log(err);
    
  // }

  await app.listen(4000, () => {
    console.log('Listen on 4000');
    
  });
}
bootstrap();
