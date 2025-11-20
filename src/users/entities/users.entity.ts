import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<User> & { _id: mongoose.Types.ObjectId };


export enum TaskType {
    UNDEFINED = 0,
    TODO = 1,
    IN_PROGRESS = 2,
    DONE = 3,
}

@Schema()
export class User {
    @Prop()
    id: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);