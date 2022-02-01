import express from "express";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";

class Setting {
  private readonly app;
  private readonly port: number;
  public readonly engine: string = "ejs";
  private readonly controllers: any[];
  private readonly actions: any[];

  constructor(ctrls: any[], actions: any[], launchPort: number) {
    this.port = launchPort;
    this.controllers = ctrls;
    this.actions = actions;
    this.app = express();
    this.initializeMiddleware();
    this.initializeViewDirectory();
    this.initializeEngine();
    this.initializeControllers();
    this.initializeActions();
  }

  private initializeMiddleware(): void {
    const { json, urlencoded } = express;
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  private initializeViewDirectory(): void {
    this.app.set("views", "./views");
  }

  private initializeEngine(): void {
    this.app.set("view engine", this.engine);
  }

  private initializeControllers(): void {
    this.controllers.forEach((controller) => {
      controller.initializedRoutes();
    });
  }

  private initializeActions(): void {
    this.actions.forEach((action) => {
      let { serverErrorHandling } = action;

      this.app.use(serverErrorHandling);
    });
  }

  public launcApp(): void {
    const DB_NAME = "strong_app";
    connect(`mongodb://localhost:27017/${DB_NAME}`).then(() => {
      this.app.listen(this.port, () => {
        console.log(`Server is running at https://localhost:${this.port}`);
      });
    });
  }
}

export default Setting;
