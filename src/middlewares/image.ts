import { RequestHandler } from "express"
import { CustomError } from "../helpers/customError" 

const imageFileMiddleware: RequestHandler = (req, _res, next) => {

    const maxFileSize = 3 * 1024 * 1024 // 3 MB
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (req.file && !req.is('multipart/form-data')) {
        return next(new CustomError('Wrong header, must be multipart/form-data', 400))
    }

    if (req.file && !allowedMimeTypes.includes(req.file.mimetype)) {
        return next(new CustomError('Wrong image format, must be WEBP, JPEG or PNG', 400))
    }

    if (req.file && req.file.size > maxFileSize) {
        return next(new CustomError('Wrong image size, must not exceed 3 MB', 400))
    }

    next()
}

export default imageFileMiddleware