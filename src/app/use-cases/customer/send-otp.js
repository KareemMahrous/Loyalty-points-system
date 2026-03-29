import { InvalidInputError } from "../../../shared/errors/invalid-input-error.js";

export class SendOtpUseCase {
  constructor({ userRepository, otpRepository, otpProvider, otpExpiryMinutes }) {
    this.userRepository = userRepository;
    this.otpRepository = otpRepository;
    this.otpProvider = otpProvider;
    this.otpExpiryMinutes = otpExpiryMinutes;
  }

  async execute(payload) {
    const allowedFields = ["mobile", "countryCode"];
    const requiredFields = ["mobile", "countryCode"];
    const payloadKeys = Object.keys(payload);
    const invalidFields = payloadKeys.filter((field) => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
      throw new InvalidInputError(
        `Only mobile and countryCode are allowed. Invalid fields: ${invalidFields.join(", ")}`
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

    const customer = await this.userRepository.findByMobile(payload.mobile);

    if (!customer || customer.countryCode !== payload.countryCode) {
      throw new InvalidInputError("Customer not found for the provided mobile and countryCode");
    }

    const otp = await this.otpProvider.generate();
    const expiresAt = new Date(Date.now() + this.otpExpiryMinutes * 60 * 1000).toISOString();

    await this.otpRepository.save({
      mobile: payload.mobile,
      otp,
      expiresAt
    });

    return {
      message: "OTP sent successfully.",
      otp_expiry_minutes: this.otpExpiryMinutes,
      mobile: payload.mobile
    };
  }
}
