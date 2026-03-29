export class OtpRepository {
  async save() {
    throw new Error("OtpRepository.save must be implemented");
  }

  async findByMobile() {
    throw new Error("OtpRepository.findByMobile must be implemented");
  }

  async deleteByMobile() {
    throw new Error("OtpRepository.deleteByMobile must be implemented");
  }
}
