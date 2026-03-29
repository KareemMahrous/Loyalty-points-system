export class ListCustomersUseCase {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute() {
    return this.customerRepository.findAll();
  }
}
