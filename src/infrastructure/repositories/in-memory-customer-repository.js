import { CustomerRepository } from "../../domain/repositories/customer-repository.js";

export class InMemoryCustomerRepository extends CustomerRepository {
  constructor() {
    super();
    this.users = [];
    this.discountCodes = [];
    this.transactions = [];
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

  async discountCodeExists(code) {
    return this.discountCodes.some((discount) => discount.discount_code === code);
  }

  async convertCashbackToDiscountByActcd(actcd, { email, value, discountCode }) {
    const customer = await this.findByActcd(actcd);

    if (!customer) {
      return null;
    }

    const currentAvailable = Number(customer.cashback.available);

    if (Number.isNaN(currentAvailable) || value > currentAvailable) {
      return null;
    }

    customer.cashback.available = (currentAvailable - value).toFixed(3);
    const invoice = await this.generateUniqueInvoice();
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const amount = this.calculateDiscountAmount(value, customer.countryCode);

    this.discountCodes.push({
      discount_id: String(this.discountCodes.length + 1),
      discount_code: discountCode,
      customer_actcd: actcd,
      email,
      value: value.toFixed(3),
      amount: amount.toFixed(3),
      country: customer.countryCode,
      created_at: now.toISOString()
    });

    this.transactions.push({
      transaction_id: this.transactions.length + 1,
      actcd,
      total: (-value).toFixed(3),
      date: today,
      invoice,
      cash_back: (-value).toFixed(3),
      tier_id: customer.tier.tier_id,
      p_date: today
    });

    return {
      discount_code: discountCode
    };
  }

  async findTransactionsByActcd(actcd) {
    return this.transactions.filter((transaction) => transaction.actcd === actcd);
  }

  async invoiceExists(invoice) {
    return this.transactions.some((transaction) => transaction.invoice === invoice);
  }

  async generateUniqueInvoice() {
    let invoice = "";

    do {
      invoice = String(Math.floor(1000 + Math.random() * 9000));
    } while (await this.invoiceExists(invoice));

    return invoice;
  }

  async findDiscountCodesByActcd(actcd) {
    return this.discountCodes
      .filter((discount) => discount.customer_actcd === actcd)
      .sort((left, right) => new Date(right.created_at) - new Date(left.created_at))
      .map((discount) => ({
        discount_id: discount.discount_id,
        actcd: discount.customer_actcd,
        discount_code: discount.discount_code,
        amount: discount.amount,
        country: discount.country,
        date: discount.created_at.replace("T", " ").slice(0, 19)
      }));
  }

  calculateDiscountAmount(value, countryCode) {
    const multiplier = this.getCountryMultiplier(countryCode);
    return value * multiplier;
  }

  getCountryMultiplier(countryCode) {
    if (["BH", "OM", "JO"].includes(countryCode)) {
      return 1;
    }

    if (countryCode === "KW") {
      return 0.8;
    }

    if (["AE", "SA", "QA"].includes(countryCode)) {
      return 10;
    }

    if (countryCode === "EG") {
      return 50;
    }

    return 5;
  }
}
