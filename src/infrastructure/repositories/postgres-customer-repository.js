import { CustomerRepository } from "../../domain/repositories/customer-repository.js";
import { postgresPool } from "../db/postgres/pool.js";

export class PostgresCustomerRepository extends CustomerRepository {
  async create(customer) {
    const query = `
      insert into users (
        actcd,
        name,
        cardname,
        mobile,
        email,
        dob,
        gender,
        country_code,
        country_name,
        company,
        tier_id,
        tier_name,
        cashback_percent,
        range_from,
        range_to,
        cashback_available,
        cashback_total_earned,
        cyearsale,
        total_sale,
        last_transaction_date
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      returning
        actcd,
        name,
        cardname,
        mobile,
        email,
        dob,
        gender,
        country_code,
        country_name,
        company,
        tier_id,
        tier_name,
        cashback_percent,
        range_from,
        range_to,
        cashback_available,
        cashback_total_earned,
        cyearsale,
        total_sale,
        last_transaction_date
    `;

    const values = [
      customer.actcd,
      customer.name,
      customer.cardname,
      customer.mobile,
      customer.email,
      customer.dob,
      customer.gender,
      customer.countryCode,
      customer.countryName,
      customer.company,
      customer.tier.tier_id,
      customer.tier.tier_name,
      customer.tier.cashback_percent,
      customer.tier.range_from,
      customer.tier.range_to,
      customer.cashback.available,
      customer.cashback.total_earned,
      customer.spending.cyearsale,
      customer.spending.total_sale,
      customer.last_transaction_date
    ];
    const result = await postgresPool.query(query, values);

    return this.mapRowToCustomer(result.rows[0]);
  }

  async findAll() {
    const result = await postgresPool.query(
      `select
        actcd,
        name,
        cardname,
        mobile,
        email,
        dob,
        gender,
        country_code,
        country_name,
        company,
        tier_id,
        tier_name,
        cashback_percent,
        range_from,
        range_to,
        cashback_available,
        cashback_total_earned,
        cyearsale,
        total_sale,
        last_transaction_date
      from users
      order by name asc`
    );

    return result.rows.map((row) => this.mapRowToCustomer(row));
  }

  async findByMobile(mobile) {
    const result = await postgresPool.query(
      `select
        actcd,
        name,
        cardname,
        mobile,
        email,
        dob,
        gender,
        country_code,
        country_name,
        company,
        tier_id,
        tier_name,
        cashback_percent,
        range_from,
        range_to,
        cashback_available,
        cashback_total_earned,
        cyearsale,
        total_sale,
        last_transaction_date
      from users
      where mobile = $1
      limit 1`,
      [mobile]
    );

    return result.rows[0] ? this.mapRowToCustomer(result.rows[0]) : null;
  }

  async countByCountryCode(countryCode) {
    const result = await postgresPool.query(
      `select count(*)::int as total
      from users
      where country_code = $1`,
      [countryCode]
    );

    return result.rows[0]?.total || 0;
  }

  async findByActcd(actcd) {
    const result = await postgresPool.query(
      `select
        actcd,
        name,
        cardname,
        mobile,
        email,
        dob,
        gender,
        country_code,
        country_name,
        company,
        tier_id,
        tier_name,
        cashback_percent,
        range_from,
        range_to,
        cashback_available,
        cashback_total_earned,
        cyearsale,
        total_sale,
        last_transaction_date
      from users
      where actcd = $1
      limit 1`,
      [actcd]
    );

    return result.rows[0] ? this.mapRowToCustomer(result.rows[0]) : null;
  }

  async updateCashbackAndTierByActcd(actcd, { available, total_earned, tier }) {
    const result = await postgresPool.query(
      `update users
      set
        cashback_available = $2,
        cashback_total_earned = $3,
        tier_id = $4,
        tier_name = $5,
        cashback_percent = $6,
        range_from = $7,
        range_to = $8
      where actcd = $1
      returning
        actcd,
        name,
        cardname,
        mobile,
        email,
        dob,
        gender,
        country_code,
        country_name,
        company,
        tier_id,
        tier_name,
        cashback_percent,
        range_from,
        range_to,
        cashback_available,
        cashback_total_earned,
        cyearsale,
        total_sale,
        last_transaction_date`,
      [
        actcd,
        available,
        total_earned,
        tier.tier_id,
        tier.tier_name,
        tier.cashback_percent,
        tier.range_from,
        tier.range_to
      ]
    );

    return result.rows[0] ? this.mapRowToCustomer(result.rows[0]) : null;
  }

  mapRowToCustomer(row) {
    return {
      actcd: row.actcd,
      name: row.name,
      cardname: row.cardname,
      mobile: row.mobile,
      email: row.email,
      dob: row.dob,
      gender: row.gender,
      countryCode: row.country_code,
      countryName: row.country_name,
      company: row.company,
      tier: {
        tier_id: row.tier_id,
        tier_name: row.tier_name,
        cashback_percent: row.cashback_percent,
        range_from: row.range_from,
        range_to: row.range_to
      },
      cashback: {
        available: row.cashback_available,
        total_earned: row.cashback_total_earned
      },
      spending: {
        cyearsale: row.cyearsale,
        total_sale: row.total_sale
      },
      last_transaction_date: row.last_transaction_date
    };
  }
}
