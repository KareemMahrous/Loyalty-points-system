import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  dbClient: process.env.DB_CLIENT || "memory",
  databaseUrl:
    process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/club1911",
  jwtSecret: process.env.JWT_SECRET || "club1911-dev-secret",
  otpExpiryMinutes: Number(process.env.OTP_EXPIRY_MINUTES || 5)
};
