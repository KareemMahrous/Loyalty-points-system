export class Customer {
  constructor({
    actcd,
    name,
    cardname,
    mobile,
    email = null,
    dob = null,
    gender = null,
    countryCode,
    countryName,
    company = null,
    tier_id = null,
    tier_name = null,
    cashback_percent = null,
    range_from = null,
    range_to = null,
    cashback_available = "0.000",
    cashback_total_earned = "0.000",
    cyearsale = "0.000",
    total_sale = "0.000",
    last_transaction_date = null
  }) {
    this.actcd = actcd;
    this.name = name;
    this.cardname = cardname;
    this.mobile = mobile;
    this.email = email;
    this.dob = dob;
    this.gender = gender;
    this.countryCode = countryCode;
    this.country = countryName;
    this.company = company;
    this.tier = {
      tier_id,
      tier_name,
      cashback_percent,
      range_from,
      range_to
    };
    this.cashback = {
      available: cashback_available,
      total_earned: cashback_total_earned
    };
    this.spending = {
      cyearsale,
      total_sale
    };
    this.last_transaction_date = last_transaction_date;
  }
}
