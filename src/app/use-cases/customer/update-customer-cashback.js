import { InvalidInputError } from "../../../shared/errors/invalid-input-error.js";
import { resolveCustomerTier } from "../../../shared/constants/customer-tiers.js";

export class UpdateCustomerCashbackUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute({ actcd, payload }) {
    if (!actcd) {
      throw new InvalidInputError("actcd is required");
    }

    const allowedFields = ["available", "total_earned"];
    const payloadKeys = Object.keys(payload || {});
    const invalidFields = payloadKeys.filter((field) => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
      throw new InvalidInputError(`Invalid fields: ${invalidFields.join(", ")}`);
    }

    const available = payload?.available;
    const totalEarned = payload?.total_earned;

    if (available === undefined || available === null || available === "") {
      throw new InvalidInputError("available is required");
    }

    if (totalEarned === undefined || totalEarned === null || totalEarned === "") {
      throw new InvalidInputError("total_earned is required");
    }

    const normalizedAvailable = Number(available);
    const normalizedTotalEarned = Number(totalEarned);

    if (Number.isNaN(normalizedAvailable) || normalizedAvailable < 0) {
      throw new InvalidInputError("available is invalid");
    }

    if (Number.isNaN(normalizedTotalEarned) || normalizedTotalEarned < 0) {
      throw new InvalidInputError("total_earned is invalid");
    }

    if (normalizedAvailable > normalizedTotalEarned) {
      throw new InvalidInputError("available cannot be greater than total_earned");
    }

    const existingCustomer = await this.customerRepository.findByActcd(actcd);

    if (!existingCustomer) {
      throw new InvalidInputError("Customer not found");
    }

    const tier = resolveCustomerTier(normalizedTotalEarned);

    return this.customerRepository.updateCashbackAndTierByActcd(actcd, {
      available: normalizedAvailable.toFixed(3),
      total_earned: normalizedTotalEarned.toFixed(3),
      tier
    });
  }
}
