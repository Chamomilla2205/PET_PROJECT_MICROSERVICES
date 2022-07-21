import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { PostCreateDto } from "./dto/post-create.dto";
import * as jwt from 'jsonwebtoken';
import { PostsRepository } from "./posts.repository";

export class UserPayloadDto {
    id: string;
    email: string;
}

@Injectable()
export class PostsService {
    constructor(private postsRepository: PostsRepository) {}

    async makeNewPost(
        data, 
        // req: Request
        ) {
        // const tokenInfo = jwt.decode(req.session.jwt) as UserPayloadDto

        data.userId = data.id;
        delete data.id

        return this.postsRepository.savePosts(data);
    }

    async getAllInfoFromDB() {
        return this.postsRepository.getAllInfo()
    }

}