import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListFilterdTaskDto } from './dto/list-filtered-tasks.dto';
import { TaskStatus } from './task-status.enum.';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  listTasks(@Query() listTaskFilterDto: ListFilterdTaskDto): Promise<Task[]> {
    return this.tasksService.listTasks(listTaskFilterDto);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:taskId')
  getTask(@Param('taskId') taskId: string): Promise<Task> {
    return this.tasksService.getTask(taskId);
  }

  @Delete('/:taskId')
  deleteTask(@Param('taskId') taskId: string): Promise<void> {
    return this.tasksService.deleteTask(taskId);
  }

  @Patch('/:taskId/status')
  updateTaskStatus(
    @Param('taskId') taskId: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(taskId, status);
  }
}
