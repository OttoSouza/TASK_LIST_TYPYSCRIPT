import { Request, Response, Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRoute = Router();

sessionsRoute.post("/", async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const authenticate = new AuthenticateUserService();

  const { user, token } = await authenticate.execute({ email, password });

  return response.json({ user, token });
});

export default sessionsRoute;
