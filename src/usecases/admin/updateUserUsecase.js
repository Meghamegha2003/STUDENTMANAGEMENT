class UpdateUserUsecase{
    constructor(adminRepo){
        this.adminRepo = adminRepo
    }

    async execute(userId,data){
       return await this.adminRepo.update(userId,data)
    }

}

module.exports = UpdateUserUsecase