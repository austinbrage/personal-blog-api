import { asyncErrorHandler } from '../utils/errorHandler'
import { UsersValidation, type IUsersValidation } from '../validations/Users'
import { type IUser } from '../types/users'
import { Request, Response, NextFunction } from "express"

class Users {
    private userModel: IUser
    private validateUser: IUsersValidation

    constructor({ userModel }: { userModel: IUser }) {
        this.userModel = userModel
        this.validateUser = new UsersValidation()
    }
    
    getUserPassword = asyncErrorHandler(async (req: Request, res: Response, _next: NextFunction) => {
        // const { user, password } = req.query
        const validation = this.validateUser.nameAndPassword(req.query)

        if(validation.success) {
            const result = await this.userModel.getUserPassword(validation.data)
    
            if(result.length === 0) {
                res.status(401).json({
                    status: 'error',
                    message: 'Incorrect username' 
                })
            } else if(result[0].password !== validation.data.password) {
                res.status(401).json({
                    status: 'error',
                    message: 'Incorrect password' 
                })
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'User validated successfully' 
                })
            }

        } else {
            res.status(400).json({
                status: 'error',
                validationError: validation.error.format()
            })
        }
    })

    insertNewUser = asyncErrorHandler(async (req: Request, res: Response, _next: NextFunction) => {
        // const { user, password } = req.body
        const validation = this.validateUser.nameAndPassword(req.query)

        if(validation.success) {
            const userName = await this.userModel.getUser(validation.data.user)
            
            if(userName.length === 0) {
                res.status(401).json({
                    status: 'error',
                    message: 'Existing user' 
                })
            } else {
                const _result = await this.userModel.insertNewUser(validation.data)
        
                res.status(201).json({
                    status: 'success',
                    message: 'User added successfully'
                })
            }
        } else {
            res.status(400).json({
                status: 'error',
                validationError: validation.error.format()
            })
        }
    })

    deleteUser = asyncErrorHandler(async (req: Request, res: Response, _next: NextFunction) => {
        // const { user, password } = req.body
        const validation = this.validateUser.nameAndPassword(req.query)

        if(validation.success) {
            const _result = await this.userModel.deleteUser(validation.data)
    
            res.status(200).json({
                status: 'success',
                message: 'User removed successfully'
            })
        } else {
            res.status(400).json({
                status: 'error',
                validationError: validation.error.format()
            })
        }
    })
}

export default Users