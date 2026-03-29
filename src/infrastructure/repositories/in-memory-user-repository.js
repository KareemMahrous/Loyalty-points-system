import { UserRepository } from "../../domain/repositories/user-repository.js";

export class InMemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = [];
  }

  async create(user) {
    this.users.push(user);
    return user;
  }

  async findAll() {
    return this.users;
  }

  async findByMobile(mobile) {
    return this.users.find((user) => user.mobile === mobile) || null;
  }

  async countByCountryCode(countryCode) {
    return this.users.filter((user) => user.countryCode === countryCode).length;
  }

  async findByActcd(actcd) {
    return this.users.find((user) => user.actcd === actcd) || null;
  }
}
