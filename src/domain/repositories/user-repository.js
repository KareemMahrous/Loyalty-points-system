export class UserRepository {
  async create() {
    throw new Error("UserRepository.create must be implemented");
  }

  async findAll() {
    throw new Error("UserRepository.findAll must be implemented");
  }

  async findByMobile() {
    throw new Error("UserRepository.findByMobile must be implemented");
  }

  async countByCountryCode() {
    throw new Error("UserRepository.countByCountryCode must be implemented");
  }

  async findByActcd() {
    throw new Error("UserRepository.findByActcd must be implemented");
  }
}
