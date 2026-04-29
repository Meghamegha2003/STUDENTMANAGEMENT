class DeleteUserUsecase {
    constructor(adminRepo){
        this.adminRepo = adminRepo
    }

    async execute(userId){

        const user = await this.adminRepo.findById(userId)
        if(!user){
            throw new Error("Student not found");
            
        }
         await this.adminRepo.delete(userId)
         return {message:"Student deleted successfully"}
    }
}

module.exports = DeleteUserUsecase