class DeleteFileUsecase {
    constructor(fileRepo){
        this.fileRepo = fileRepo
    }

    async execute(prouctId){
        if(!productId){
            throw new Error("productId is required");
        }

        const result =await this.fileRepo.deleteFile(productId)
        if (result.result !== "ok") {
            throw new Error("Image deletion failed");
        }
        return {
            message:"Image deleted successfully"
        }
    }
}

module.exports = DeleteFileUsecase