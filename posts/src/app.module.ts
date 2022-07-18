import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CookieSessionModule } from 'nestjs-cookie-session';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    PostsModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    CookieSessionModule.forRoot({
      session: { 
        secure: true,
        signed: false
       }
       ,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
