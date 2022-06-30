import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface UserAttr {
    email: string;
    password: string;
}

// interface UserModel extends mongoose.Model<UserDoc> {
//     build(attrs: UserAttr): UserDoc 
// }

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true,
//     }
// }, {
//     toJSON: {
//         transform(doc, ret) {
//             ret.id = ret._id
//             delete ret._id
//             delete ret.password
//             delete ret.__v
//         }
//     }
// })


export type UserDocument = User & mongoose.Document

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
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// userSchema.statics.build = (attrs: UserAttr) => {
//     return new User(attrs);
// }

// const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// export { User, userSchema };
