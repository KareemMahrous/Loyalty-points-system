create table if not exists users (
  actcd varchar(50) primary key,
  name varchar(120) not null,
  cardname varchar(120) not null,
  mobile varchar(50) not null unique,
  email varchar(180) unique,
  dob date,
  gender varchar(20),
  country_code varchar(20) not null,
  country_name varchar(120) not null,
  company varchar(180) default '',
  tier_id integer,
  tier_name varchar(120),
  cashback_percent numeric(10, 2),
  range_from numeric(14, 3),
  range_to numeric(14, 3),
  cashback_available numeric(14, 3) default 0.000,
  cashback_total_earned numeric(14, 3) default 0.000,
  cyearsale numeric(14, 3) default 0.000,
  total_sale numeric(14, 3) default 0.000,
  last_transaction_date timestamp
);

create table if not exists discount_codes (
  discount_id bigserial primary key,
  discount_code varchar(80) not null unique,
  customer_actcd varchar(50) not null references users(actcd) on delete cascade,
  email varchar(180) not null,
  value numeric(14, 3) not null,
  amount numeric(14, 3) not null,
  country varchar(20) not null,
  created_at timestamp not null default now()
);

create table if not exists customer_transactions (
  transaction_id bigserial primary key,
  actcd varchar(50) not null references users(actcd) on delete cascade,
  total numeric(14, 3) not null,
  date date not null,
  invoice varchar(4) not null unique,
  cash_back numeric(14, 3) not null,
  tier_id integer,
  p_date date not null,
  created_at timestamp not null default now()
);
