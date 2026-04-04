import { CustomerRepository } from "../../domain/repositories/customer-repository.js";

export class InMemoryCustomerRepository extends CustomerRepository {
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

  async updateCashbackAndTierByActcd(actcd, { available, total_earned, tier }) {
    const customer = await this.findByActcd(actcd);

    if (!customer) {
      return null;
    }

    customer.cashback = {
      available,
      total_earned
    };
    customer.tier = {
      ...tier
    };

    return customer;
  }

  async updateProfileByActcd(actcd, updates) {
    const customer = await this.findByActcd(actcd);

    if (!customer) {
      return null;
    }

    if (updates.name !== undefined) {
      customer.name = updates.name;
      customer.cardname = updates.cardname;
    }

    if (updates.email !== undefined) {
      customer.email = updates.email;
    }

    if (updates.dob !== undefined) {
      customer.dob = updates.dob;
    }

    return customer;
  }
}
