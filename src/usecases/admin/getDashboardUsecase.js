class GetDashboardUsecase {
    constructor(adminRepo){
        this.adminRepo = adminRepo
    }

    async execute({name,email}){
        const user = await this.adminRepo.find()
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