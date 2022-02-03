import { sign } from "jsonwebtoken";

class GenerateAccessToken {
  public generateToken(login: string): string {
    const token: string = sign({ data: login }, "secret", {
      expiresIn: "1h",
    });

    return token;
  }
}

export default GenerateAccessToken;
