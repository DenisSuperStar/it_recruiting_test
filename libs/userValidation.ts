class UserValidation {
  public userValid(body: { login: string, password: string }): boolean {
    const { login, password } = body;
    const isUserValid: boolean = (login && password) ? true : false;

    return isUserValid;
  }
}

export default UserValidation;
