import { container } from "../../../infrastructure/container.js";
import { InvalidInputError } from "../../../shared/errors/invalid-input-error.js";
import {
  errorResponse,
  successResponse,
} from "../../../shared/http/response-model.js";

export async function createCustomerController(req, res) {
  try {
    await container.createCustomerUseCase.execute(req.body);
    return res.status(201).json(
      successResponse({
        message: "User created successfully.",
        data: {
          message: "User created successfully."
        },
      }),
    );
  } catch (error) {
    const statusCode = error instanceof InvalidInputError ? 422 : 500;

    return res.status(statusCode).json(
      errorResponse({
        message: "Customer creation failed.",
        error: error.message,
      }),
    );
  }
}

export async function listCustomersController(_req, res) {
  const customers = await container.listCustomersUseCase.execute();
  return res.status(200).json(
    successResponse({
      message: "Customers fetched successfully.",
      data: customers,
    }),
  );
}
