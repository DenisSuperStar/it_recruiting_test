import { sign } from "jsonwebtoken";

class GenerateAccessToken {
  private authLogin: string = "";

  public generateToken(userLogin: string): string {
    this.authLogin = userLogin;

    const token: string = sign({ data: this.authLogin }, "secret", {
      expiresIn: "1h",
    });

    return token;
  }
}

export default GenerateAccessToken;
