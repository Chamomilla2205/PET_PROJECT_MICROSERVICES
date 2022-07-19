import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUpModule } from './signup/signup.module';
import { CookieSessionModule } from 'nestjs-cookie-session';
import { SigninModule } from './signin/signin.module';
import { SignoutModule } from './signout/signout.module';
import { NatsStreamingTransport } from '@nestjs-plugins/nestjs-nats-streaming-transport'

@Module({
  imports: [
    // NatsStreamingTransport.register({
    //   clusterId: 'pet_project_microservices',
    //   clientId: `1`,
    //   connectOptions: {
    //     url: 'http://localhost:4222'
    //   }
    // }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CookieSessionModule.forRoot({
      session: { 
        secure: true,
        signed: false
       },
    }),
    SignUpModule,
    SigninModule,
    SignoutModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
