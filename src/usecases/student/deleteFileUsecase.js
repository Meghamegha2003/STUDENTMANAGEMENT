class DeleteFileUsecase {
    constructor(fileRepo){
        this.fileRepo = fileRepo
    }

    async execute(publicId){
        if(!publicId){
            throw new Error("publicId is required");
        }

        const result =await this.fileRepo.deleteFile(publicId)
        if (result.result !== "ok") {
            throw new Error("Image deletion failed");
        }
        return {
             success: true,
            message:"Image deleted successfully",
            publicId,
            result
        }
    }
}

module.exports = DeleteFileUsecase