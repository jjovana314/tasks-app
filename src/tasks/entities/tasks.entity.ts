import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Board } from "./board.entity";

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
}

export const TaskSchema = SchemaFactory.createForClass(Task);
