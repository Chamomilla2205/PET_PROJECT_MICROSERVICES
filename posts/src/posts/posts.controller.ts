import { Body, Controller, Delete, Get, Post, Put, Req } from "@nestjs/common";
import { Request } from "express";
import { PostCreateDto } from "./dto/post-create.dto";
import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}
    @Post()
    async createPost(
        @Body() postInfo: PostCreateDto,
        @Req() req: Request
        ) {
            
        return this.postsService.makeNewPost(postInfo, req)
    }

    @Get()
    async getPostById() {

    }

    @Delete()
    async deletePostById() {

    }

    @Put()

    async updatePost() {

    }
}