import { AuthenticationError } from "../../../shared/errors/authentication-error.js";

export class GetCustomerQrCodeUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute({ actcd }) {
    const customer = await this.customerRepository.findByActcd(actcd);

    if (!customer) {
      throw new AuthenticationError("Customer not found.");
    }

    return {
      actcd: customer.actcd,
      customer_name: customer.name,
      cashback: customer.cashback.available,
      tier_id: customer.tier.tier_id,
      tier_name: customer.tier.tier_name,
      tier_cashback_percent: customer.tier.cashback_percent,
      tier_range_from: customer.tier.range_from,
      tier_range_to: customer.tier.range_to,
      cyearsale: customer.spending.cyearsale,
      qr_code_data: customer.actcd,
      qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(customer.actcd)}`
    };
  }
}
