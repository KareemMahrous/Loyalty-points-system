import { AuthenticationError } from "../../../shared/errors/authentication-error.js";
import { InvalidInputError } from "../../../shared/errors/invalid-input-error.js";

export class UpdateCustomerProfileUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute({ actcd, payload }) {
    if (!actcd) {
      throw new AuthenticationError("Customer not found.");
    }

    const allowedFields = ["name", "email", "dob"];
    const payloadKeys = Object.keys(payload || {});
    const invalidFields = payloadKeys.filter((field) => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
      throw new InvalidInputError(`Invalid fields: ${invalidFields.join(", ")}`);
    }

    if (payloadKeys.length === 0) {
      throw new InvalidInputError("At least one field is required");
    }

    const updates = {};

    if (payload.name !== undefined) {
      if (typeof payload.name !== "string" || payload.name.trim() === "") {
        throw new InvalidInputError("name is invalid");
      }

      updates.name = payload.name.trim();
      updates.cardname = payload.name.trim();
    }

    if (payload.email !== undefined) {
      if (payload.email === null || payload.email === "") {
        updates.email = null;
      } else {
        if (typeof payload.email !== "string" || /\s/.test(payload.email)) {
          throw new InvalidInputError("email is invalid");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payload.email)) {
          throw new InvalidInputError("email is invalid");
        }

        updates.email = payload.email;
      }
    }

    if (payload.dob !== undefined) {
      if (payload.dob === null || payload.dob === "") {
        updates.dob = null;
      } else {
        if (
          typeof payload.dob !== "string" ||
          !/^\d{4}-\d{2}-\d{2}$/.test(payload.dob) ||
          Number.isNaN(Date.parse(payload.dob))
        ) {
          throw new InvalidInputError("dob is invalid");
        }

        updates.dob = payload.dob;
      }
    }

    const customer = await this.customerRepository.updateProfileByActcd(actcd, updates);

    if (!customer) {
      throw new AuthenticationError("Customer not found.");
    }

    return customer;
  }
}
