import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUpModule } from './signup/signup.module';
import { CookieSessionModule } from 'nestjs-cookie-session';
import { SigninModule } from './signin/signin.module';
import { SignoutModule } from './signout/signout.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://auth-mongo-srv:27017/auth'),
    CookieSessionModule.forRoot({
      session: { 
        // secret: 'asdf',
        secure: true,
        signed: false
       }
       ,
    }),
    SignUpModule,
    SigninModule,
    SignoutModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
