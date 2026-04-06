export class CustomerRepository {
  async create() {
    throw new Error("CustomerRepository.create must be implemented");
  }

  async findAll() {
    throw new Error("CustomerRepository.findAll must be implemented");
  }

  async findByMobile() {
    throw new Error("CustomerRepository.findByMobile must be implemented");
  }

  async countByCountryCode() {
    throw new Error("CustomerRepository.countByCountryCode must be implemented");
  }

  async findByActcd() {
    throw new Error("CustomerRepository.findByActcd must be implemented");
  }

  async updateCashbackAndTierByActcd() {
    throw new Error("CustomerRepository.updateCashbackAndTierByActcd must be implemented");
  }

  async updateProfileByActcd() {
    throw new Error("CustomerRepository.updateProfileByActcd must be implemented");
  }

  async discountCodeExists() {
    throw new Error("CustomerRepository.discountCodeExists must be implemented");
  }

  async convertCashbackToDiscountByActcd() {
    throw new Error("CustomerRepository.convertCashbackToDiscountByActcd must be implemented");
  }

  async findTransactionsByActcd() {
    throw new Error("CustomerRepository.findTransactionsByActcd must be implemented");
  }

  async invoiceExists() {
    throw new Error("CustomerRepository.invoiceExists must be implemented");
  }

  async findDiscountCodesByActcd() {
    throw new Error("CustomerRepository.findDiscountCodesByActcd must be implemented");
  }
}
