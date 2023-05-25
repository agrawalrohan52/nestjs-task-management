import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ListFilterdTaskDto } from "./dto/list-filtered-tasks.dto";
import { TaskStatus } from "./task-status.enum.";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  listTasks(
    @Query() listTaskFilterDto: ListFilterdTaskDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    return this.tasksService.listTasks(listTaskFilterDto, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get("/:taskId")
  getTask(
    @Param("taskId") taskId: string,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.getTask(taskId, user);
  }

  @Delete("/:taskId")
  deleteTask(
    @Param("taskId") taskId: string,
    @GetUser() user: User
  ): Promise<void> {
    return this.tasksService.deleteTask(taskId, user);
  }

  @Patch("/:taskId/status")
  updateTaskStatus(
    @Param("taskId") taskId: string,
    @Body("status") status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(taskId, status, user);
  }
}
