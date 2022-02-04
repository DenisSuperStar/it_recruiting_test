import IRequestBody from "../interfaces/requestBody.interface";

class VerifyUser {
  private readonly emailRule: string;

  constructor() {
    this.emailRule =
      "^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$";
  }

  public userValid(body: IRequestBody): boolean {
    const { login, password } = body;

    return login && password ? true : false;
  }

  public emailValid(body: IRequestBody): boolean {
    const { email } = body;

    return Boolean(email.match(this.emailRule));
  }
}

export default VerifyUser;
