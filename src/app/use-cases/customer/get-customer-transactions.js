import { AuthenticationError } from "../../../shared/errors/authentication-error.js";

export class GetCustomerTransactionsUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute({ actcd }) {
    const customer = await this.customerRepository.findByActcd(actcd);

    if (!customer) {
      throw new AuthenticationError("Customer not found.");
    }

    const transactions = await this.customerRepository.findTransactionsByActcd(actcd);

    return {
      actcd: customer.actcd,
      customer_name: customer.name,
      total_cashback: customer.cashback.total_earned,
      points: customer.cashback.available,
      transaction_count: transactions.length,
      transactions
    };
  }
}
