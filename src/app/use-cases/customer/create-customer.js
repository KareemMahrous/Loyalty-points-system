import { Customer } from "../../../domain/entities/customer.js";
import { CUSTOMER_TIERS } from "../../../shared/constants/customer-tiers.js";
import { InvalidInputError } from "../../../shared/errors/invalid-input-error.js";

export class CreateCustomerUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
    this.countryNames = new Intl.DisplayNames(["en"], { type: "region" });
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

    const normalizedCountryCode = String(payload.countryCode)
      .trim()
      .toUpperCase();
    const countryName = this.countryNames.of(normalizedCountryCode);

    if (!countryName) {
      throw new InvalidInputError("countryCode is invalid");
    }

    const actcd = await this.generateActcd(normalizedCountryCode);

    const customer = new Customer({
      actcd,
      name: payload.name,
      cardname: payload.name.toUpperCase(),
      mobile: payload.mobile,
      email: payload.email ?? null,
      dob: null,
      gender: null,
      countryCode: normalizedCountryCode,
      countryName,
      company: null,
      tier_id: CUSTOMER_TIERS[0].tier_id,
      tier_name: CUSTOMER_TIERS[0].tier_name,
      cashback_percent: CUSTOMER_TIERS[0].cashback_percent,
      range_from: CUSTOMER_TIERS[0].range_from,
      range_to: CUSTOMER_TIERS[0].range_to,
      cashback_available: "0.000",
      cashback_total_earned: "0.000",
      cyearsale: "0.000",
      total_sale: "0.000",
      last_transaction_date: null,
    });

    return this.customerRepository.create(customer);
  }

  async generateActcd(countryCode) {
    const totalCustomers =
      await this.customerRepository.countByCountryCode(countryCode);
    return `${countryCode}${totalCustomers + 1}`;
  }
}
