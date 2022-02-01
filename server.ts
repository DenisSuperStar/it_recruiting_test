import Setting from ".";
import "./routes/users/autorization";
import "./routes/users/registration";

const PORT: number = 8000;
const app: Setting = new Setting(PORT);
const { launcApp } = app;

launcApp();