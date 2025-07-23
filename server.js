import express from "express";
import { publicDir } from "./utils/path/path.handler.js";
import port from "./utils/port/port.handler.js";
import todoRoutes from "./routes/API/todo.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// default middlewares
app.use(express.static(publicDir));
app.use(express.json());

//API routes
app.use("/api/todos", todoRoutes);

//error handeling
app.use(errorMiddleware);

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);
