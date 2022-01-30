import express from "express";
import SaveUserToDb from "../libs/saveUserToDb";
import ShowView from "../libs/showView";

class UserRegistrationController {
    private readonly path: string = '/register';
    private readonly name: string;
    private readonly title: string;
    private readonly app;
    private userSave: SaveUserToDb;
    private renderView: ShowView;

    constructor(viewName: string, viewTitle: string) {
        this.name = viewName;
        this.title = viewTitle;
        this.app = express();
        this.userSave = new SaveUserToDb();
        this.renderView = new ShowView(this.name, this.title);
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const { render } = this.renderView;
        const { saveUser } = this.userSave;

        this.app.get(this.path, render);
        this.app.post(this.path, saveUser);
    }
}

export default UserRegistrationController;