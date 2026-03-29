import { container } from "../../../infrastructure/container.js";
import { errorResponse } from "../../../shared/http/response-model.js";

export async function authenticateBearer(req, res, next) {
  const authorizationHeader = req.headers.authorization || "";

  if (!authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json(
      errorResponse({
        message: "Authentication failed.",
        error: "Authorization bearer token is required."
      })
    );
  }

  const token = authorizationHeader.slice("Bearer ".length).trim();

  try {
    const payload = await container.tokenService.verify(token);
    req.auth = payload;
    return next();
  } catch (_error) {
    return res.status(401).json(
      errorResponse({
        message: "Authentication failed.",
        error: "Invalid or expired token."
      })
    );
  }
}
