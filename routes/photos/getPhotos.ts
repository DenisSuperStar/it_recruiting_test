import express from "express";

const app = express();

app.get("/get-photos", (req: express.Request, res: express.Response) => {
  res.send("Hello from get photos");
});
