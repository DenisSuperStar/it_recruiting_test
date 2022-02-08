import express from "express";
import { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";

class App {
  public readonly PORT;
  private readonly app;
  private readonly engine;
  private readonly controllers;

  constructor(ctrls: any, engine: string, launchPort: number) {
    this.app = express();
    this.engine = engine;
    this.PORT = launchPort;
    this.controllers = ctrls;
    this.initMiddleware();
    this.initViews();
    this.initEngine();
    this.initControllers();
  }

  private initMiddleware(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  private initViews(): void {
    this.app.set("views", "./views");
  }

  private initEngine(): void {
    this.app.set("view engine", this.engine);
  }

  private initControllers(): void {
    this.controllers.forEach((controller: any) => {
      controller.initRoutes();
    });
  }

  public launchApp(): void {
    const DB_NAME = "strong_app";
    connect(`mongodb://localhost:27017/${DB_NAME}`).then(() => {
      console.log(`Server is running at https://localhost:${this.PORT}`);
    });
  }
}

export default App;