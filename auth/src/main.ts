import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

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
