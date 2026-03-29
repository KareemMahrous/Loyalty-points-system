import { successResponse } from "../../../shared/http/response-model.js";

export function healthController(_req, res) {
  return res.status(200).json(
    successResponse({
      message: "Health check completed successfully.",
      data: {
        status: "ok",
        message: "API is running"
      }
    })
  );
}
