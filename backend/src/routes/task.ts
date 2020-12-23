import { parseISO } from "date-fns";
import { Request, Response, Router } from "express";
import CreateTaskService from "../services/CreateTaskService";
const taskRoute = Router();
import ensureAuth from "../middlewares/ensuseAuthenticated";
import { classToClass } from "class-transformer";
import FindTaskService from "../services/FindTaskService";
import UpdateTaskService from "../services/UpdateTaskService";
import DeleteTaskService from "../services/DeleteTaskService";

taskRoute.use(ensureAuth);

taskRoute.get("/", async (request: Request, response: Response) => {
  const { id: user_id } = request.user;

  const service = new FindTaskService();

  const task = await service.execute({ user_id });

  return response.json(classToClass(task));
});

taskRoute.post("/", async (request: Request, response: Response) => {
  const { task_name, description, initial_date, end_date } = request.body;
  const { id: user_id } = request.user;

  const parsedInitialDate = parseISO(initial_date);
  const parsedEndDate = parseISO(end_date);

  const service = new CreateTaskService();

  const task = await service.execute({
    task_name,
    description,
    initial_date: parsedInitialDate,
    end_date: parsedEndDate,
    user_id,
  });

  return response.json(task);
});

taskRoute.put("/:id", async (request: Request, response: Response) => {
  const {task_name, description, initial_date, end_date } = request.body;
  const { id} = request.params

  const parsedInitialDate = parseISO(initial_date);
  const parsedEndDate = parseISO(end_date);

  const service = new UpdateTaskService();

  const task = await service.execute({
    id,
    task_name,
    description,
    initial_date: parsedInitialDate,
    end_date: parsedEndDate,
  });

  return response.json(task);
});

taskRoute.delete("/:id", async (request: Request, response: Response) => {

  const { id } = request.params;

  const service = new DeleteTaskService();

  const task = await service.execute({
    id,
  });

  return response.json(task);
});

export default taskRoute;
