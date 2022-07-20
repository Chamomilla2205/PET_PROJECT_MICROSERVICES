import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { natsWrapper, Subject, UserCreatedListener } from "@zhytomyr_war_elefant/common";
import { Request } from "express";
import { PostCreateDto } from "./dto/post-create.dto";
import { PostsService } from "./posts.service";
import {  } from '@zhytomyr_war_elefant/common';
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @EventPattern(Subject.UserCreated)
    async logEvent(@Payload() data, @Ctx() ctx: NatsStreamingContext) {
        console.log(data);
        this.postsService.makeNewPost(data)
        // new UserCreatedListener(natsWrapper.client).listen()

        ctx.message.ack()
    }

    @Post()
    async createPost(
        @Body() postInfo: PostCreateDto,
        @Req() req: Request
        ) {
        
        return this.postsService.makeNewPost(postInfo)
    }

    @Get()
    async getPostById() {        
        return this.postsService.getAllInfoFromDB()
    }

    @Delete()
    async deletePostById() {

    }

    @Put()
    async updatePost() {

    }
}