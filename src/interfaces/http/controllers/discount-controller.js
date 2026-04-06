import { container } from "../../../infrastructure/container.js";
import { AuthenticationError } from "../../../shared/errors/authentication-error.js";
import { InvalidInputError } from "../../../shared/errors/invalid-input-error.js";
import { errorResponse, successResponse } from "../../../shared/http/response-model.js";

export async function convertDiscountController(req, res) {
  try {
    const data = await container.convertDiscountUseCase.execute({
      actcd: req.auth.actcd,
      payload: req.body
    });

    return res.status(200).json(
      successResponse({
        message: "Discount code created successfully.",
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
        message: "Discount code creation failed.",
        error: error.message
      })
    );
  }
}

export async function listDiscountCodesController(req, res) {
  try {
    const data = await container.listDiscountCodesUseCase.execute({
      actcd: req.auth.actcd
    });

    return res.status(200).json(
      successResponse({
        message: "Discount codes fetched successfully.",
        data
      })
    );
  } catch (error) {
    const statusCode = error instanceof AuthenticationError ? 401 : 500;

    return res.status(statusCode).json(
      errorResponse({
        message: "Discount codes fetch failed.",
        error: error.message
      })
    );
  }
}
