export class OtpRepository {
  async save() {
    throw new Error("OtpRepository.save must be implemented");
  }

  async saveStoreOtp() {
    throw new Error("OtpRepository.saveStoreOtp must be implemented");
  }

  async findByMobile() {
    throw new Error("OtpRepository.findByMobile must be implemented");
  }

  async findStoreOtpByActcd() {
    throw new Error("OtpRepository.findStoreOtpByActcd must be implemented");
  }

  async deleteByMobile() {
    throw new Error("OtpRepository.deleteByMobile must be implemented");
  }

  async deleteStoreOtpByActcd() {
    throw new Error("OtpRepository.deleteStoreOtpByActcd must be implemented");
  }
}
