import { UserRepository } from "../../domain/repositories/user-repository.js";
import { postgresPool } from "../db/postgres/pool.js";

export class PostgresUserRepository extends UserRepository {
  async create(user) {
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
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      returning
        actcd,
        name,
        cardname,
        mobile,
        email,
        dob,
        gender,
        country_code,
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
      user.actcd,
      user.name,
      user.cardname,
      user.mobile,
      user.email,
      user.dob,
      user.gender,
      user.countryCode,
      user.company,
      user.tier.tier_id,
      user.tier.tier_name,
      user.tier.cashback_percent,
      user.tier.range_from,
      user.tier.range_to,
      user.cashback.available,
      user.cashback.total_earned,
      user.spending.cyearsale,
      user.spending.total_sale,
      user.last_transaction_date
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
