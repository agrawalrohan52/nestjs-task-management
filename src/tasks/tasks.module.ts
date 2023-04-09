import { Module } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { provideCustomRepository } from '../utils/custom-repository.util';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [provideCustomRepository(Task, TaskRepository), TasksService],
})
export class TasksModule {}
