import { User } from "../../../domain/entities/user.js";
import { InvalidInputError } from "../../../shared/errors/invalid-input-error.js";

export class CreateCustomerUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(payload) {
    const requiredFields = ["name", "mobile", "countryCode"];
    const allowedFields = ["name", "mobile", "countryCode", "email"];
    const payloadKeys = Object.keys(payload);

    const invalidFields = payloadKeys.filter(
      (field) => !allowedFields.includes(field),
    );

    if (invalidFields.length > 0) {
      throw new InvalidInputError(
        `Invalid fields: ${invalidFields.join(", ")}`,
      );
    }

    for (const field of requiredFields) {
      if (
        payload[field] === undefined ||
        payload[field] === null ||
        payload[field] === ""
      ) {
        throw new InvalidInputError(`${field} is required`);
      }
    }

    if (typeof payload.mobile === "string" && /\s/.test(payload.mobile)) {
      throw new InvalidInputError("mobile is invalid");
    }

    if (
      payload.email !== undefined &&
      payload.email !== null &&
      payload.email !== ""
    ) {
      if (typeof payload.email !== "string" || /\s/.test(payload.email)) {
        throw new InvalidInputError("email is invalid");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(payload.email)) {
        throw new InvalidInputError("email is invalid");
      }
    }

    const existingCustomer = await this.customerRepository.findByMobile(
      payload.mobile,
    );

    if (existingCustomer) {
      throw new InvalidInputError("mobile already exists");
    }

    const actcd = await this.generateActcd(payload.countryCode);

    const customer = new User({
      actcd,
      name: payload.name,
      cardname: payload.name.toUpperCase(),
      mobile: payload.mobile,
      email: payload.email ?? null,
      dob: null,
      gender: null,
      countryCode: payload.countryCode,
      company: "",
      tier_id: 1,
      tier_name: "Starter",
      cashback_percent: 10,
      range_from: 0,
      range_to: 100,
      cashback_available: "0.000",
      cashback_total_earned: "0.000",
      cyearsale: "0.000",
      total_sale: "0.000",
      last_transaction_date: null,
    });

    return this.customerRepository.create(customer);
  }

  async generateActcd(countryCode) {
    const normalizedCountryCode = String(countryCode).trim().toUpperCase();
    const totalCustomers = await this.customerRepository.countByCountryCode(
      normalizedCountryCode,
    );
    return `${normalizedCountryCode}${totalCustomers + 1}`;
  }
}
