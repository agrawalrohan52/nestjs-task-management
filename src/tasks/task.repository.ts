import { User } from "src/auth/user.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ListFilterdTaskDto } from "./dto/list-filtered-tasks.dto";
import { TaskStatus } from "./task-status.enum.";
import { Task } from "./task.entity";

export class TaskRepository extends Repository<Task> {
  async listTasks(filterDto: ListFilterdTaskDto, user: User) {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder("task");
    query.where({ user });
    if (status) {
      query.andWhere("task.status = :status", { status });
    }
    if (search) {
      query.andWhere(
        "(LOWER(task.description) LIKE LOWER(:search) OR LOWER(task.title) LIKE LOWER(:search))",
        { search: `%${search}%` }
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }
}
