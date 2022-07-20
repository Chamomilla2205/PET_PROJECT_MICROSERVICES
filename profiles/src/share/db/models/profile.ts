import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

interface ProfileAttr {
    email: string;
    userId: string;
    nickname: string;
    age: number;
    statusTxt: string;
    avatar: [];
    photos: [];
}

interface ProfileDoc extends mongoose.Document {
    email: string;
    userId: string;
    nickname: string;
    age: number;
    statusTxt: string;
    avatar: [];
    photos: [];
}

export type ProfileDocument = Profile & mongoose.Document

@Schema({
    toJSON: {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
    }
},
})

export class Profile {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    nickname: string;

    @Prop()
    age: number;

    @Prop()
    statusTxt: string;

    @Prop()
    avatar: []

    @Prop()
    photos: []
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)