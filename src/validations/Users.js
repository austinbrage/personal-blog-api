const  { userSchema, userPasswordSchema } = require('../schemas/users')

class Users {
    constructor() {
        this.userSchema = userSchema
        this.userPasswordSchema = userPasswordSchema
    }

    userName(data) {
        return this.userName.safeParse(data)
    }

    userAndPassword(data) {
        return this.userAndPassword.safeParse(data)
    }
}