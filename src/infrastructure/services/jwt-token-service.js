import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export class JwtTokenService {
  async generate(payload) {
    return jwt.sign(payload, env.jwtSecret, {
      expiresIn: "365d"
    });
  }

  async verify(token) {
    return jwt.verify(token, env.jwtSecret);
  }
}
