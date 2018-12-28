import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
// middleware
import logger from "./utils/logger";
// controller
import songkickController from "./controllers/songkick";
//
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// custom middleware
app.use(logger);
// routes
app.get("/", async (request: Request, response: Response) => {
  response.send({ message: "Hello from home...!" });
});

app.get("/songkick", songkickController.festivals);
app.post("/songkick", songkickController.filteredFestivals);

// catch 404 and forward to error handler
app.use((request: Request, response: Response, next: NextFunction) => {
  response.status(400).send({ error: "Not found! (404)" });
});

export default app;
