import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Board } from "./board.entity";
import { User } from "src/users/entities/users.entity";

export type TaskDocument = mongoose.HydratedDocument<Task> & { _id: mongoose.Types.ObjectId };

@Schema()
export class Task {
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board', default: null })
    statusId: Board | null;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
    userId: User | null;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
