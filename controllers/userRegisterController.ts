import express from "express";
import UserDb from "../libs/userDb";

class UserRegistration extends UserDb {
    private readonly access: string = '';
    private readonly title: string = '';
    private readonly path: string = '/register';
    private readonly app = express();

    constructor(view: string, viewTitle: string) {
        super();
        this.access = view;
        this.title = viewTitle;
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.app.get(this.path, this.accessByRegister);
        this.app.post(this.path, this.saveUser);
    }

    private accessByRegister(req: express.Request, res: express.Response) {
        res.render(this.access, {
            title: this.title
        });
    }
}

export default UserRegistration;