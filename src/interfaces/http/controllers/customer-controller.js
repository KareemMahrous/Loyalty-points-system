import { container } from "../../../infrastructure/container.js";
import { AuthenticationError } from "../../../shared/errors/authentication-error.js";
import { InvalidInputError } from "../../../shared/errors/invalid-input-error.js";
import { errorResponse, successResponse } from "../../../shared/http/response-model.js";

export async function sendOtpController(req, res) {
  try {
    const data = await container.sendOtpUseCase.execute(req.body);
    return res.status(200).json(
      successResponse({
        message: "OTP sent successfully.",
        data
      })
    );
  } catch (error) {
    const statusCode = error instanceof InvalidInputError ? 422 : 500;
    return res.status(statusCode).json(
      errorResponse({
        message: "OTP sending failed.",
        error: error.message
      })
    );
  }
}

export async function authenticateCustomerController(req, res) {
  try {
    const data = await container.authenticateCustomerUseCase.execute(req.body);
    return res.status(200).json(
      successResponse({
        message: "Authentication successful.",
        data
      })
    );
  } catch (error) {
    let statusCode = 500;

    if (error instanceof InvalidInputError) {
      statusCode = 422;
    } else if (error instanceof AuthenticationError) {
      statusCode = 401;
    }

    return res.status(statusCode).json(
      errorResponse({
        message: "Authentication failed.",
        error: error.message
      })
    );
  }
}

export async function customerProfileController(req, res) {
  try {
    const data = await container.getCustomerProfileUseCase.execute({
      actcd: req.auth.actcd
    });

    return res.status(200).json(
      successResponse({
        message: "Customer profile fetched successfully.",
        data
      })
    );
  } catch (error) {
    const statusCode = error instanceof AuthenticationError ? 401 : 500;
    return res.status(statusCode).json(
      errorResponse({
        message: "Customer profile fetch failed.",
        error: error.message
      })
    );
  }
}
