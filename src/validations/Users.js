const  { userSchema, userPasswordSchema } = require('../schemas/users')

class Users {
    constructor() {
        this.userSchema = userSchema
        this.userPasswordSchema = userPasswordSchema
    }

    name(data) {
        return this.userName.safeParse(data)
    }

    nameAndPassword(data) {
        return this.userAndPassword.safeParse(data)
    }
}