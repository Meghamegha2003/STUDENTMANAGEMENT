const IStudentRepository = require("../../domain/repositories/IStudentRepository");
const models = require("../database/models");

class StudentRepository extends IStudentRepository {
  async create(student) {
    return await models.create(student);
  }

  async findByEmail(email) {
    return await models.findOne({ email });
  }

  async findById(id) {
    return await models.findById(id);
  }

  async findAll() {
    return await models.find();
  }

  async searchByName(name) {
    return await models.find({ name: { $regex: name, $options: "i" } });
  }

  async update(id, data) {
    return await models.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await models.findByIdAndDelete(id);
  }
}

module.exports = StudentRepository;
