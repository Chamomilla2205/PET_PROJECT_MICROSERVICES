import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post, PostDocument } from "src/shared/db/models/post";

@Injectable()
export class PostsRepository {
    constructor(
        @InjectModel(Post.name) private postsModele: Model<PostDocument>
        ) {}

    async savePosts(data) {
        const profile = new this.postsModele(data)

        return profile.save()
    }

    async getAllInfo() {
        return this.postsModele.find()  
    }
}