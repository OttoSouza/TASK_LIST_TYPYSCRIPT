import { getRepository } from "typeorm";
import Tasks from "../models/Tasks";

interface IRequest {
  user_id: string;
}

export default class FindTaskService {
  public async execute({ user_id }: IRequest): Promise<Tasks[]> {
    const tasksRepository = getRepository(Tasks);
    const findTasks = await tasksRepository.find({ where: { user_id } });
    return findTasks;
  }
}
