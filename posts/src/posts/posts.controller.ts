import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { Request } from "express";
import { PostCreateDto } from "./dto/post-create.dto";
import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}
    // @EventPattern()
    @Post()
    async createPost(
        @Body() postInfo: PostCreateDto,
        @Req() req: Request
        ) {
        return this.postsService.makeNewPost(postInfo, req)
    }

    @Get(':id')
    async getPostById(@Param() id) {        
        return this.postsService.getSinglePost(id)
    }

    @Delete()
    async deletePostById() {

    }

    @Put()
    async updatePost() {

    }
}