import { AuthenticationError } from "../../../shared/errors/authentication-error.js";
import { InvalidInputError } from "../../../shared/errors/invalid-input-error.js";

export class AuthenticateCustomerUseCase {
  constructor({ customerRepository, otpRepository, tokenService }) {
    this.customerRepository = customerRepository;
    this.otpRepository = otpRepository;
    this.tokenService = tokenService;
  }

  async execute(payload) {
    const allowedFields = ["mobile", "otp"];
    const requiredFields = ["mobile", "otp"];
    const payloadKeys = Object.keys(payload);
    const invalidFields = payloadKeys.filter((field) => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
      throw new InvalidInputError(
        `Only mobile and otp are allowed. Invalid fields: ${invalidFields.join(", ")}`
      );
    }

    for (const field of requiredFields) {
      if (payload[field] === undefined || payload[field] === null || payload[field] === "") {
        throw new InvalidInputError(`${field} is required`);
      }
    }

    if (typeof payload.mobile !== "string" || /\s/.test(payload.mobile)) {
      throw new InvalidInputError("mobile is invalid");
    }

    const otpRecord = await this.otpRepository.findByMobile(payload.mobile);

    if (!otpRecord) {
      throw new AuthenticationError("OTP not found or expired.");
    }

    if (new Date(otpRecord.expiresAt).getTime() < Date.now()) {
      await this.otpRepository.deleteByMobile(payload.mobile);
      throw new AuthenticationError("OTP not found or expired.");
    }

    if (otpRecord.otp !== payload.otp) {
      throw new AuthenticationError("OTP is invalid.");
    }

    const customer = await this.customerRepository.findByMobile(payload.mobile);

    if (!customer) {
      throw new AuthenticationError("Customer not found.");
    }

    await this.otpRepository.deleteByMobile(payload.mobile);

    const token = await this.tokenService.generate({
      actcd: customer.actcd,
      mobile: customer.mobile
    });

    return {
      message: "Authentication successful.",
      token,
      token_type: "Bearer",
      expires_in: 31536000,
      customer: {
        actcd: customer.actcd,
        name: customer.name,
        mobile: customer.mobile,
        email: customer.email
      }
    };
  }
}
