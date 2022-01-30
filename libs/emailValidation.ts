class EmailValidation {
  private email: string = "";
  private readonly emailRule: string;

  constructor() {
    this.emailRule =
      "^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$";
  }

  public validEmail(emailAddress: string): boolean {
    this.email = emailAddress;

    return <boolean>(<unknown>this.email.match(this.emailRule));
  }
}

export default EmailValidation;
