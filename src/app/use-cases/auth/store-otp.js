import { AuthenticationError } from "../../../shared/errors/authentication-error.js";

export class StoreOtpUseCase {
  constructor({ customerRepository, otpRepository, retryTimeSeconds = 60 }) {
    this.customerRepository = customerRepository;
    this.otpRepository = otpRepository;
    this.retryTimeSeconds = retryTimeSeconds;
  }

  async execute({ actcd }) {
    const customer = await this.customerRepository.findByActcd(actcd);

    if (!customer) {
      throw new AuthenticationError("Customer not found.");
    }

    const otp = this.generateOtp();
    const expiresAt = new Date(Date.now() + this.retryTimeSeconds * 1000).toISOString();

    await this.otpRepository.saveStoreOtp({
      actcd: customer.actcd,
      mobile: customer.mobile,
      otp,
      expiresAt,
    });

    return {
      otp,
      expire_in: this.retryTimeSeconds,
    };
  }

  generateOtp() {
    return String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  }
}
