import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./task-status.enum.";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ListFilterdTaskDto } from "./dto/list-filtered-tasks.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { User } from "src/auth/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRespository: TaskRepository
  ) {}
  // private tasks: Task[] = [];

  listTasks(filterDto: ListFilterdTaskDto, user: User): Promise<Task[]> {
    return this.taskRespository.listTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRespository.createTask(createTaskDto, user);
  }

  async getTask(taskId: string, user: User): Promise<Task> {
    const task = await this.taskRespository.findOne({
      where: {
        id: taskId,
        user,
      },
    });
    if (!task) throw new NotFoundException(`Task with id ${taskId} not found`);
    return task;
  }

  async deleteTask(taskId: string, user: User): Promise<void> {
    const result = await this.taskRespository.delete({ id: taskId, user });
    if (!result.affected)
      throw new NotFoundException(`Task with id ${taskId} not found`);
  }

  async updateTaskStatus(
    taskId: string,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTask(taskId, user);
    task.status = status;
    await this.taskRespository.save(task);
    return task;
  }
}
