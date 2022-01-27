import express from "express";

const app = express();

app.get("/load-photos", (req: express.Request, res: express.Response) => {
  res.send("Hello from view form of load photos");
});

app.post("/load-photos", (req: express.Request, res: express.Response) => {
  res.send("Hello from processing load photos");
});
