import express from "express";
import md5 from "md5";
import GenerateAccessToken from "./generateAccessToken";
import IError from "../interfaces/error.interface";

class CreateUser {
  private readonly body: any;
  private user: any;
  private readonly User: any;
  private readonly created: IError;
  public encryptedPassword: string = '';
  private readonly accessToken: GenerateAccessToken;
  private authToken: string | undefined;
  
  constructor(body: any, UserModel: any, create: IError,) {
    this.body = body;
    this.user = new Object();
    this.User = UserModel;
    this.created = create;
    this.encryptePassword();
    this.accessToken = new GenerateAccessToken(body);
    this.createUser();
  }

  private encryptePassword(): void {
    const { password } = this.body;
    this.encryptedPassword = md5(password);
  }

  private createUser(): void {
    const { login, email } = this.body;
    const { generateToken } = this.accessToken;

    this.authToken = generateToken();
    this.user = new this.User({
      login,
      email,
      password: this.encryptePassword,
      token: this.authToken,
    });
  }

  public async saveUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { login } = this.body;

    await this.user.save().then(() => {
      res.json({
        message: this.created.name,
        statusCode: this.created.status,
      });
    });

    res.cookie("authLogin", login);
  }
}

export default CreateUser;
