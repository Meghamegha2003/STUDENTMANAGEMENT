class Student {
    constructor(name,email,password,profileImg){
        this.name=name,
        this.email=email,
        this.password=password,
        this.profileImg = profileImg || null
    }
}

module.exports = Student