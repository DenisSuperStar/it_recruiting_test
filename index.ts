import express from "express";
import "./routes/users/autorization";
import  "./routes/users/registration";

const app = express();
const PORT: number = 8000;

app.set("views", "./views");
app.set("View engine", "ejs");

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Express + type script server!");
});

app.get("/delete-photo", (req: any, res: any) => {
  res.send("Hello from delete photos");
});

app.post("/delete-photo", (req: any, res: any) => {
  res.send("Hello from post delete photos");
});

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
