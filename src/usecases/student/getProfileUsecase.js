class GetProfileUsecase {
  constructor(studentRepo) {
    this.studentRepo = studentRepo;
  }

  async execute(userId) {
    const user = await this.studentRepo.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      name: user.name,
      email: user.email,
      profileImg: user.profileImg || null,
    };
  }
}

module.exports = GetProfileUsecase
