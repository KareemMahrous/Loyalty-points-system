import { OtpRepository } from "../../domain/repositories/otp-repository.js";

export class InMemoryOtpRepository extends OtpRepository {
  constructor() {
    super();
    this.records = new Map();
    this.storeOtpRecords = new Map();
  }

  async save(record) {
    this.records.set(record.mobile, record);
    return record;
  }

  async saveStoreOtp(record) {
    this.storeOtpRecords.set(record.actcd, record);
    return record;
  }

  async findByMobile(mobile) {
    return this.records.get(mobile) || null;
  }

  async findStoreOtpByActcd(actcd) {
    return this.storeOtpRecords.get(actcd) || null;
  }

  async deleteByMobile(mobile) {
    this.records.delete(mobile);
  }

  async deleteStoreOtpByActcd(actcd) {
    this.storeOtpRecords.delete(actcd);
  }
}
