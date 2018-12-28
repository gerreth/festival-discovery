import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
// middleware
import logger from "./utils/logger";
// services
import { refreshStrategy } from "./services/spotifyAuthService";
// controllers
import authController from "./controllers/AuthController";
import bandsController from "./controllers/BandsController";
import usersController from "./controllers/UsersController";

import mongo from "./clients/mongo";
mongo.init();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// custom middleware
app.use(logger);

// routes
app.get("/", (request: Request, response: Response) => {
  response.send({ message: "Hello from home!" });
});

app.get("/auth/spotify", authController.auth);

app.get("/user/:user/me", refreshStrategy, usersController.me);

app.post("/bands/next/:user", refreshStrategy, bandsController.next);
app.post("/bands/play/:user/:uri", refreshStrategy, bandsController.play);
app.get("/bands/top/:user", refreshStrategy, bandsController.top);
app.post("/bands/similar/:user", refreshStrategy, bandsController.similar);

// catch 404 and forward to error handler
app.use((request: Request, response: Response, next: NextFunction) => {
  response.status(400).send({ error: "Not found! (404)" });
});

export default app;
