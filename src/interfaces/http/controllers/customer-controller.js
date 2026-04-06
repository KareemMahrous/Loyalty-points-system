import { container } from "../../../infrastructure/container.js";
import { AuthenticationError } from "../../../shared/errors/authentication-error.js";
import { InvalidInputError } from "../../../shared/errors/invalid-input-error.js";
import { errorResponse, successResponse } from "../../../shared/http/response-model.js";

function toCustomerProfileSummary(customer) {
  return {
    actcd: customer.actcd,
    name: customer.name,
    cardname: customer.cardname,
    mobile: customer.mobile,
    email: customer.email,
    dob: customer.dob,
    gender: customer.gender,
    country: customer.country,
    company: customer.company,
  };
}

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

export async function storeOtpController(req, res) {
  try {
    const data = await container.storeOtpUseCase.execute({
      actcd: req.auth.actcd
    });

    return res.status(200).json(
      successResponse({
        message: "OTP stored successfully.",
        data
      })
    );
  } catch (error) {
    const statusCode = error instanceof AuthenticationError ? 401 : 500;
    return res.status(statusCode).json(
      errorResponse({
        message: "OTP store failed.",
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

export async function customerQrCodeController(req, res) {
  try {
    const data = await container.getCustomerQrCodeUseCase.execute({
      actcd: req.auth.actcd
    });

    return res.status(200).json(
      successResponse({
        message: "Customer QR code fetched successfully.",
        data
      })
    );
  } catch (error) {
    const statusCode = error instanceof AuthenticationError ? 401 : 500;
    return res.status(statusCode).json(
      errorResponse({
        message: "Customer QR code fetch failed.",
        error: error.message
      })
    );
  }
}

export async function customerTransactionsController(req, res) {
  try {
    const data = await container.getCustomerTransactionsUseCase.execute({
      actcd: req.auth.actcd
    });

    return res.status(200).json(
      successResponse({
        message: "Customer transactions fetched successfully.",
        data
      })
    );
  } catch (error) {
    const statusCode = error instanceof AuthenticationError ? 401 : 500;
    return res.status(statusCode).json(
      errorResponse({
        message: "Customer transactions fetch failed.",
        error: error.message
      })
    );
  }
}

export async function updateCustomerProfileController(req, res) {
  try {
    const customer = await container.updateCustomerProfileUseCase.execute({
      actcd: req.auth.actcd,
      payload: req.body
    });

    return res.status(200).json(
      successResponse({
        message: "Customer profile updated successfully.",
        data: toCustomerProfileSummary(customer)
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
        message: "Customer profile update failed.",
        error: error.message
      })
    );
  }
}
