import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum.';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListFilterdTaskDto } from './dto/list-filtered-tasks.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRespository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];

  listTasks(filterDto: ListFilterdTaskDto): Promise<Task[]> {
    return this.taskRespository.listTasks(filterDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRespository.createTask(createTaskDto);
  }

  async getTask(taskId: string): Promise<Task> {
    const task = await this.taskRespository.findOne({
      where: {
        id: taskId,
      },
    });
    if (!task) throw new NotFoundException(`Task with id ${taskId} not found`);
    return task;
  }

  async deleteTask(taskId: string): Promise<void> {
    const result = await this.taskRespository.delete({ id: taskId });
    if (!result.affected)
      throw new NotFoundException(`Task with id ${taskId} not found`);
  }

  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTask(taskId);
    task.status = status;
    await this.taskRespository.save(task);
    return task;
  }
}
