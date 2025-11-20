import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type BoardDocument = mongoose.HydratedDocument<Board> & { _id: mongoose.Types.ObjectId };


export enum TaskType {
    UNDEFINED = 0,
    TODO = 1,
    IN_PROGRESS = 2,
    DONE = 3,
}

@Schema()
export class Board {
    @Prop()
    id: string;

    @Prop()
    type: TaskType;
}

export const BoardSchema = SchemaFactory.createForClass(Board);