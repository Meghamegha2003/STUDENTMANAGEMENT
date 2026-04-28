class UploadFileUsecase {
    constructor(filerRepo){
        this.filerRepo = filerRepo
    }

    async execute(file){
        if(!file){
            throw new Error("File required");
        }

        const result = await this.filerRepo.uploadFile(file.buffer)
        return result
    }
}

module.exports = UploadFileUsecase




