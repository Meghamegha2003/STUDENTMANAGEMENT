class GetHomeUsecases {
  constructor(studentRepo) {
    this.studentRepo = studentRepo;
  }

  async execute(userId) {
    const user =  await this.studentRepo.findById(userId);
    return {
      name: user.name,
    };
  }
}

module.exports = GetHomeUsecases;
