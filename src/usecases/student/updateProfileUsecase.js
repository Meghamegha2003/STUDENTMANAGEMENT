class UpdateProfileUsecase {
    constructor(studentRepo){
        this.studentRepo = studentRepo
    }

    async execute(userId,data){
        return await this.studentRepo.update(userId,data)
    }
}

module.exports=UpdateProfileUsecase