import { getDate, isEqual } from "date-fns";
import { getRepository } from "typeorm";
import Tasks from "../models/Tasks";

interface IRequest {
  id: string;
  task_name: string;
  description: string;
  initial_date: Date;
  end_date: Date;
}

export default class UpdateTaskService {
  public async execute({
    id,
    task_name,
    description,
    initial_date,
    end_date,
  }: IRequest): Promise<Tasks> {
    const taskRepository = getRepository(Tasks);
    const task = await taskRepository.findOne(id);

    //obtendo apenas os dias
    const updateParsedInitialDate = getDate(initial_date);
    const UpdateParsedEndDate = getDate(end_date);

    if (!task) {
      throw new Error("Task not found.");
    }

    if (isEqual(updateParsedInitialDate, UpdateParsedEndDate)) {
      throw new Error("Dates doesn't be equals ");
    } else if (updateParsedInitialDate > UpdateParsedEndDate) {
      throw new Error("Inicial date is bigger than end date");
    } else {
      task.task_name = task_name;
      task.description = description;
      task.initial_date = initial_date;
      task.end_date = end_date;
      return taskRepository.save(task);
    }
  }
}
