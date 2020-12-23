import express from "express";
import "express-async-errors";
import routes from "./routes";

import "./database";
import cors from "cors";
import globalError from "./middlewares/globalError";
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(globalError);
app.listen(3333);
