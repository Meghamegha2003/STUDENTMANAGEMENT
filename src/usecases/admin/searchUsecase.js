class SearchUsecase{
    constructor(adminRepo){
        this.adminRepo = adminRepo
    }

    async execute(name){
        const student = await this.adminRepo.searchByName(name)
        if(!student){
            throw new Error("No user found");
        }
        return student
    }
}

module.exports = SearchUsecase