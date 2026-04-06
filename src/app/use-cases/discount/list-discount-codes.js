import { AuthenticationError } from "../../../shared/errors/authentication-error.js";

export class ListDiscountCodesUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute({ actcd }) {
    const customer = await this.customerRepository.findByActcd(actcd);

    if (!customer) {
      throw new AuthenticationError("Customer not found.");
    }

    return this.customerRepository.findDiscountCodesByActcd(actcd);
  }
}
