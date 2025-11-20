import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/tasks.entity';
import { Board, BoardSchema } from './entities/board.entity';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), 
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }])
  ]
})
export class TasksModule { }
