import {Router} from "express";
import sessionsRoute from "./session";
import taskRoute from "./task";
import userRoute from "./user";
const routes = Router();

routes.use("/users", userRoute);
routes.use("/sessions", sessionsRoute);
routes.use("/tasks", taskRoute);

export default routes;
