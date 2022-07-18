import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { PostCreateDto } from "./dto/post-create.dto";
import * as jwt from 'jsonwebtoken';

export class UserPayloadDto {
    id: string;
    email: string;
}

@Injectable()
export class PostsService {
    constructor() {}
    private posts = [];

    async makeNewPost(postInfo: PostCreateDto, req: Request) {
        const tokenInfo = jwt.decode(req.session.jwt) as UserPayloadDto

        const newPost = {
            id: this.posts.length.toString(),
            title: postInfo.title,
            text: postInfo.text,
            userId: tokenInfo.id
        }
        this.posts.push(newPost)

        
        return this.posts[this.posts.length - 1]
    }

    async getSinglePost({id}) {
        return this.posts.find((post) => post.id === id)
    }

}