interface IUser {
  readonly login: string;
  readonly email: string;
  readonly password: string;
  token: string;
}

export default IUser;
