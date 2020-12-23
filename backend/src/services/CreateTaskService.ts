import { getRepository } from "typeorm";
import { isEqual, getDate } from "date-fns";
import AppError from "../errors/AppError";

import Tasks from "../models/Tasks";
interface IRequest {
  task_name: string;
  description: string;
  initial_date: Date;
  end_date: Date;
  user_id: string;
}

export default class CreateTaskService {
  public async execute({
    task_name,
    description,
    initial_date,
    end_date,
    user_id,
  }: IRequest): Promise<Tasks> {
    //criando o repositorio para usar os metodos do typeorm
    const taskRepository = getRepository(Tasks);

    //obtendo apenas os dias
    const parsedInitialDate = getDate(initial_date);
    const parsedEndDate = getDate(end_date);

    // verificando se os dias forem iguais ou o dia de finalizaçao for maior do que o inicial, näo pode salvar
    if (isEqual(parsedInitialDate, parsedEndDate)) {
      throw new AppError("Dates doesn't be equals ");
    } else if (parsedInitialDate > parsedEndDate) {
      throw new AppError("Inicial date is bigger than end date");
    } else {
      const task = taskRepository.create({
        task_name,
        description,
        initial_date,
        end_date,
        user_id,
      });

      await taskRepository.save(task);

      return task;
    }
  }
}
