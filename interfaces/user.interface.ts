interface IUser {
  readonly login: string;
  readonly email: string;
  readonly password: string;
  registerDate: Date;
}

export default IUser;
