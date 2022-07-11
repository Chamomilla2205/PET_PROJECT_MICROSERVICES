import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CookieSessionModule } from 'nestjs-cookie-session';

@Module({
  imports: [
    PostsModule,
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
