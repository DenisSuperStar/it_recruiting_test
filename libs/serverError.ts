import express from "express";

class ServerError {
  private readonly name: string;
  private readonly status: number;

  constructor(error: string, code: number) {
    this.name = error;
    this.status = code;
  }

  public serverErrorHandling(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    res.json({
      error: this.name,
      statusCode: this.status,
    });

    next(this.name);
  }
}

export default ServerError;
