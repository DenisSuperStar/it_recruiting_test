import express from "express";

class ServerError {
    private readonly error: string;
    private readonly status: number;

    constructor(errorName: string, statusCode: number) {
        this.error = errorName;
        this.status = statusCode;
    }

    public serverErrorHandling(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.json({
            error: this.error,
            status: this.status
        });

        next(this.error);
    }
}
export default ServerError;