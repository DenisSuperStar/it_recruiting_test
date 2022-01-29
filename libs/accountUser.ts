class AccountUser {
  protected verifiedUser(body: { login: string; password: string }): boolean {
    const { login, password } = body;
    const isNotEmptyUser: boolean = login && password ? true : false;

    return isNotEmptyUser;
  }
}

export default AccountUser;
