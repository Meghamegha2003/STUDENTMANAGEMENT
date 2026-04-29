const IFileUploadRepository = require("../../domain/repositories/IFileUploadRepository");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

class FileUploadRepository extends IFileUploadRepository {
  uploadFile(buffer) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "student_profile" },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        },
      );

      streamifier.createReadStream(buffer).pipe(stream);
    });
  }

  async deleteFile(publicId) {
    return await cloudinary.uploader.destroy(publicId);
  }
}

module.exports = FileUploadRepository
