import md5 from "md5";
import IUserDocument from "../interfaces/userDocument.interface";

class ComparePasswords {
  public compareHashes(password: string, user: IUserDocument): boolean {
    const convertPassword = md5(password);

    return convertPassword == user.password;
  }
}

export default ComparePasswords;
