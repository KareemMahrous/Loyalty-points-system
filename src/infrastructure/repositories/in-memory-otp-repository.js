import { OtpRepository } from "../../domain/repositories/otp-repository.js";

export class InMemoryOtpRepository extends OtpRepository {
  constructor() {
    super();
    this.records = new Map();
  }

  async save(record) {
    this.records.set(record.mobile, record);
    return record;
  }

  async findByMobile(mobile) {
    return this.records.get(mobile) || null;
  }

  async deleteByMobile(mobile) {
    this.records.delete(mobile);
  }
}
