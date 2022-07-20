import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface PostAttr {
    userId: string;
    email: string;
}

interface PostDoc extends mongoose.Document {
    userId: string;
    email: string;
}

export type PostDocument = Post & mongoose.Document

@Schema({
    toJSON: {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
},
})
export class Post {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    email: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

