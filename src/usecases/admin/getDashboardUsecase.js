class GetDashboardUsecase {
    constructor(adminRepo){
        this.adminRepo = adminRepo
    }

    async execute(adminId){
        const user = await this.adminRepo.findById(adminId)
        if(!user){
            throw new Error("User not fount");
        }
        return {
            name:user.name,
            email:user.email
        }
    }
}

module.exports=GetDashboardUsecase