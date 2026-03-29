import { env } from "./config/env.js";
import { InMemoryUserRepository } from "./repositories/in-memory-user-repository.js";
import { InMemoryOtpRepository } from "./repositories/in-memory-otp-repository.js";
import { PostgresUserRepository } from "./repositories/postgres-user-repository.js";
import { AuthenticateCustomerUseCase } from "../app/use-cases/customer/authenticate-customer.js";
import { CreateCustomerUseCase } from "../app/use-cases/customer/create-customer.js";
import { GetCustomerProfileUseCase } from "../app/use-cases/customer/get-customer-profile.js";
import { ListCustomersUseCase } from "../app/use-cases/customer/list-customers.js";
import { SendOtpUseCase } from "../app/use-cases/customer/send-otp.js";
import { DefaultOtpProvider } from "./services/default-otp-provider.js";
import { JwtTokenService } from "./services/jwt-token-service.js";

function makeUserRepository() {
  if (env.dbClient === "postgres") {
    return new PostgresUserRepository();
  }

  return new InMemoryUserRepository();
}

const userRepository = makeUserRepository();
const otpRepository = new InMemoryOtpRepository();
const otpProvider = new DefaultOtpProvider();
const tokenService = new JwtTokenService();

export const container = {
  createCustomerUseCase: new CreateCustomerUseCase(userRepository),
  getCustomerProfileUseCase: new GetCustomerProfileUseCase(userRepository),
  listCustomersUseCase: new ListCustomersUseCase(userRepository),
  sendOtpUseCase: new SendOtpUseCase({
    userRepository,
    otpRepository,
    otpProvider,
    otpExpiryMinutes: env.otpExpiryMinutes,
  }),
  authenticateCustomerUseCase: new AuthenticateCustomerUseCase({
    userRepository,
    otpRepository,
    tokenService,
  }),
  tokenService,
};
