import express from "express";
import cookieParser from "cookie-parser";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

class Setting {
  private readonly app;
  private readonly port: number;
  public readonly engine: string = "ejs";

  constructor(launchPort: number) {
    this.port = launchPort;
    this.app = express();
    this.initializeMiddleware();
    this.initializeViewDirectory();
    this.initializeEngine();
    this.initializeErrorHandling();
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

  private initializeErrorHandling(): void {
    this.app.use(this.errorHandleNotFound);
    this.app.use(this.errorHandleServerError);
  }

  private errorHandleNotFound(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    res.json({
      error: ReasonPhrases.FORBIDDEN,
      statusCode: StatusCodes.FORBIDDEN,
    });

    next();
  }

  private errorHandleServerError(
    err: express.ErrorRequestHandler,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    res.json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });

    next(err);
  }

  public launcApp(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running at https://localhost:${this.port}`);
    });
  }
}

export default Setting;
