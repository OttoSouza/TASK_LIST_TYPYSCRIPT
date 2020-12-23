import { Request, Response, Router } from "express";
import CreateUserService from "../services/CreateUserService";
import FindUserService from "../services/FindUserService";
import { classToClass } from "class-transformer";
import UpdateUserService from "../services/UpdateUserService";
import ensureAuth from "../middlewares/ensuseAuthenticated";

const userRoute = Router();

userRoute.get("/", async (request: Request, response: Response) => {
  const service = new FindUserService();
  const users = await service.execute();

  return response.json(classToClass(users));
});

userRoute.post("/", async (request: Request, response: Response) => {
  const { name, email, password, cell } = request.body;

  const service = new CreateUserService();

  const user = await service.execute({ name, email, password, cell });

  return response.json(user);
});

userRoute.put("/", ensureAuth, async (request: Request, response: Response) => {
  const { name, email, password, old_password, cell } = request.body;

  const { id: user_id } = request.user;

  const service = new UpdateUserService();

  const user = await service.execute({
    user_id,
    name,
    email,
    old_password,
    password,
    cell,
  });

  return response.status(200).json(classToClass(user));
});

export default userRoute;
