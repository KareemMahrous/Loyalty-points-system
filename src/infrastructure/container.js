import { env } from "./config/env.js";
import { InMemoryCustomerRepository } from "./repositories/in-memory-customer-repository.js";
import { InMemoryOtpRepository } from "./repositories/in-memory-otp-repository.js";
import { PostgresCustomerRepository } from "./repositories/postgres-customer-repository.js";
import { AuthenticateCustomerUseCase } from "../app/use-cases/auth/authenticate-customer.js";
import { SendOtpUseCase } from "../app/use-cases/auth/send-otp.js";
import { StoreOtpUseCase } from "../app/use-cases/auth/store-otp.js";
import { CreateCustomerUseCase } from "../app/use-cases/customer/create-customer.js";
import { GetCustomerProfileUseCase } from "../app/use-cases/customer/get-customer-profile.js";
import { GetCustomerQrCodeUseCase } from "../app/use-cases/customer/get-customer-qr-code.js";
import { GetCustomerTransactionsUseCase } from "../app/use-cases/customer/get-customer-transactions.js";
import { ListCustomersUseCase } from "../app/use-cases/customer/list-customers.js";
import { ConvertDiscountUseCase } from "../app/use-cases/discount/convert-discount.js";
import { ListDiscountCodesUseCase } from "../app/use-cases/discount/list-discount-codes.js";
import { UpdateCustomerProfileUseCase } from "../app/use-cases/customer/update-customer-profile.js";
import { UpdateCustomerCashbackUseCase } from "../app/use-cases/customer/update-customer-cashback.js";
import { DefaultOtpProvider } from "./services/default-otp-provider.js";
import { JwtTokenService } from "./services/jwt-token-service.js";

function makeCustomerRepository() {
  if (env.dbClient === "postgres") {
    return new PostgresCustomerRepository();
  }

  return new InMemoryCustomerRepository();
}

const customerRepository = makeCustomerRepository();
const otpRepository = new InMemoryOtpRepository();
const otpProvider = new DefaultOtpProvider();
const tokenService = new JwtTokenService();

export const container = {
  createCustomerUseCase: new CreateCustomerUseCase(customerRepository),
  convertDiscountUseCase: new ConvertDiscountUseCase(customerRepository),
  getCustomerProfileUseCase: new GetCustomerProfileUseCase(customerRepository),
  getCustomerQrCodeUseCase: new GetCustomerQrCodeUseCase(customerRepository),
  getCustomerTransactionsUseCase: new GetCustomerTransactionsUseCase(customerRepository),
  listDiscountCodesUseCase: new ListDiscountCodesUseCase(customerRepository),
  listCustomersUseCase: new ListCustomersUseCase(customerRepository),
  updateCustomerProfileUseCase: new UpdateCustomerProfileUseCase(customerRepository),
  updateCustomerCashbackUseCase: new UpdateCustomerCashbackUseCase(customerRepository),
  sendOtpUseCase: new SendOtpUseCase({
    customerRepository,
    otpRepository,
    otpProvider,
    otpExpiryMinutes: env.otpExpiryMinutes,
  }),
  storeOtpUseCase: new StoreOtpUseCase({
    customerRepository,
    otpRepository,
    retryTimeSeconds: 60,
  }),
  authenticateCustomerUseCase: new AuthenticateCustomerUseCase({
    customerRepository,
    otpRepository,
    tokenService,
  }),
  tokenService,
};
