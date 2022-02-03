import md5 from "md5";

class ComparePasswords {
  public compareHashes(password: string, user: any): boolean {
    const convertPassword = md5(password);

    return convertPassword == user.password;
  }
}

export default ComparePasswords;
