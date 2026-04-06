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
      customer.country,
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

  async updateProfileByActcd(actcd, updates) {
    const fields = [];
    const values = [actcd];
    let index = 2;

    if (updates.name !== undefined) {
      fields.push(`name = $${index}`);
      values.push(updates.name);
      index += 1;

      fields.push(`cardname = $${index}`);
      values.push(updates.cardname);
      index += 1;
    }

    if (updates.email !== undefined) {
      fields.push(`email = $${index}`);
      values.push(updates.email);
      index += 1;
    }

    if (updates.dob !== undefined) {
      fields.push(`dob = $${index}`);
      values.push(updates.dob);
      index += 1;
    }

    if (fields.length === 0) {
      return this.findByActcd(actcd);
    }

    const result = await postgresPool.query(
      `update users
      set ${fields.join(", ")}
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
      values
    );

    return result.rows[0] ? this.mapRowToCustomer(result.rows[0]) : null;
  }

  async discountCodeExists(code) {
    const result = await postgresPool.query(
      `select 1
      from discount_codes
      where discount_code = $1
      limit 1`,
      [code]
    );

    return result.rowCount > 0;
  }

  async convertCashbackToDiscountByActcd(actcd, { email, value, discountCode }) {
    const client = await postgresPool.connect();

    try {
      await client.query("begin");

      const customerResult = await client.query(
        `select cashback_available, tier_id, country_code
        from users
        where actcd = $1
        for update`,
        [actcd]
      );

      if (customerResult.rowCount === 0) {
        await client.query("rollback");
        return null;
      }

      const currentAvailable = Number(customerResult.rows[0].cashback_available);
      const tierId = customerResult.rows[0].tier_id;
      const countryCode = customerResult.rows[0].country_code;

      if (Number.isNaN(currentAvailable) || value > currentAvailable) {
        await client.query("rollback");
        return null;
      }

      const invoice = await this.generateUniqueInvoice(client);
      const amount = this.calculateDiscountAmount(value, countryCode);

      await client.query(
        `update users
        set cashback_available = $2
        where actcd = $1`,
        [actcd, (currentAvailable - value).toFixed(3)]
      );

      await client.query(
        `insert into discount_codes (
          discount_code,
          customer_actcd,
          email,
          value,
          amount,
          country
        )
        values ($1, $2, $3, $4, $5, $6)`,
        [discountCode, actcd, email, value.toFixed(3), amount.toFixed(3), countryCode]
      );

      await client.query(
        `insert into customer_transactions (
          actcd,
          total,
          date,
          invoice,
          cash_back,
          tier_id,
          p_date
        )
        values ($1, $2, current_date, $3, $4, $5, current_date)`,
        [actcd, (-value).toFixed(3), invoice, (-value).toFixed(3), tierId]
      );

      await client.query("commit");

      return {
        discount_code: discountCode
      };
    } catch (error) {
      await client.query("rollback");
      throw error;
    } finally {
      client.release();
    }
  }

  async findTransactionsByActcd(actcd) {
    const result = await postgresPool.query(
      `select
        transaction_id,
        actcd,
        total,
        date,
        invoice,
        cash_back,
        tier_id,
        p_date
      from customer_transactions
      where actcd = $1
      order by transaction_id desc`,
      [actcd]
    );

    return result.rows.map((row) => ({
      transaction_id: row.transaction_id,
      actcd: row.actcd,
      total: row.total,
      date: row.date,
      invoice: row.invoice,
      cash_back: row.cash_back,
      tier_id: row.tier_id,
      p_date: row.p_date
    }));
  }

  async invoiceExists(invoice) {
    const result = await postgresPool.query(
      `select 1
      from customer_transactions
      where invoice = $1
      limit 1`,
      [invoice]
    );

    return result.rowCount > 0;
  }

  async generateUniqueInvoice(client = postgresPool) {
    let invoice = "";
    let exists = true;

    while (exists) {
      invoice = String(Math.floor(1000 + Math.random() * 9000));
      const result = await client.query(
        `select 1
        from customer_transactions
        where invoice = $1
        limit 1`,
        [invoice]
      );
      exists = result.rowCount > 0;
    }

    return invoice;
  }

  async findDiscountCodesByActcd(actcd) {
    const result = await postgresPool.query(
      `select
        discount_id,
        customer_actcd,
        discount_code,
        amount,
        country,
        created_at
      from discount_codes
      where customer_actcd = $1
      order by discount_id desc`,
      [actcd]
    );

    return result.rows.map((row) => ({
      discount_id: String(row.discount_id),
      actcd: row.customer_actcd,
      discount_code: row.discount_code,
      amount: String(row.amount),
      country: row.country,
      date: row.created_at.toISOString().replace("T", " ").slice(0, 19)
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
      country: row.country_name,
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
