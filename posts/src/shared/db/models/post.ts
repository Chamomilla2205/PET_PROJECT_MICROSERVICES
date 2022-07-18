import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface PostAttr {
    title: string;
    text: string;
}

interface PostDoc extends mongoose.Document {
    email: string;
    password: string;
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
    title: string;

    @Prop({ required: true })
    text: string;
}

export const UserSchema = SchemaFactory.createForClass(Post);

