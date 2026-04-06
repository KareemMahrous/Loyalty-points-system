import { AuthenticationError } from "../../../shared/errors/authentication-error.js";
import { InvalidInputError } from "../../../shared/errors/invalid-input-error.js";

export class ConvertDiscountUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute({ actcd, payload }) {
    if (!actcd) {
      throw new AuthenticationError("Customer not found.");
    }

    const allowedFields = ["email", "value"];
    const payloadKeys = Object.keys(payload || {});
    const invalidFields = payloadKeys.filter((field) => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
      throw new InvalidInputError(`Invalid fields: ${invalidFields.join(", ")}`);
    }

    if (payload.value === undefined || payload.value === null || payload.value === "") {
      throw new InvalidInputError("value is required");
    }

    const customer = await this.customerRepository.findByActcd(actcd);

    if (!customer) {
      throw new AuthenticationError("Customer not found.");
    }

    const email = customer.email ?? payload.email;

    if (!email) {
      throw new InvalidInputError("email is required");
    }

    if (typeof email !== "string" || /\s/.test(email)) {
      throw new InvalidInputError("email is invalid");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new InvalidInputError("email is invalid");
    }

    const value = Number(payload.value);
    if (Number.isNaN(value) || value <= 0) {
      throw new InvalidInputError("value is invalid");
    }

    const available = Number(customer.cashback.available);
    if (Number.isNaN(available) || value > available) {
      throw new InvalidInputError("value cannot be greater than cashback available");
    }

    const discountCode = await this.generateUniqueDiscountCode(customer.actcd);
    const result = await this.customerRepository.convertCashbackToDiscountByActcd(
      actcd,
      {
        email,
        value,
        discountCode
      }
    );

    if (!result) {
      throw new InvalidInputError("Unable to convert cashback to discount code");
    }

    return result;
  }

  async generateUniqueDiscountCode(actcd) {
    let discountCode = "";

    do {
      discountCode = `${actcd}-${this.generateSuffix()}`;
    } while (await this.customerRepository.discountCodeExists(discountCode));

    return discountCode;
  }

  generateSuffix() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let index = 0; index < 6; index += 1) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
  }
}
