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
}
