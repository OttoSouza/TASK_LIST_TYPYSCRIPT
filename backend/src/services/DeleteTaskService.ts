import { getDate, isEqual } from "date-fns";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Tasks from "../models/Tasks";

interface IRequest {
  id: string;
}

export default class DeleteTaskService {
  public async execute({ id }: IRequest): Promise<void> {
    const taskRepository = getRepository(Tasks);
    const task = await taskRepository.findOne(id);

    if (!task) {
      throw new AppError("Task not found.", 401);
    }

    await taskRepository.delete(task.id);
  }
}
