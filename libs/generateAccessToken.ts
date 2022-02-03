import { sign } from "jsonwebtoken";

class GenerateAccessToken {
  private body: any;

  constructor(body: any) {
    this.body = body;
  }

  public generateToken(): string {
    const { login } = this.body;
    const token: string = sign({ data: login }, 'secret', {
      expiresIn: '1h'
    });

    return token;
  }
}

export default GenerateAccessToken;
