import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', true)
  app.enableCors()
  app.use(json())
  app.setGlobalPrefix('auth')

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
