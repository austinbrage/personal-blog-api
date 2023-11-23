import { RowDataPacket } from "mysql2"
import type { OkResponse, ErrorResponse } from "../types/custom"
import { ZodFormattedError } from "zod"

export const createOkResponse = ({
    message, 
    data
}: {
    message: string, 
    token?: string
    data?: RowDataPacket[]
}
): OkResponse => {

    return {
        success: true,
        result: {
            message: message,
            data: data ? data : null
        }
    }
}

export const createErrorResponse = ({
    message,
    error
}: {
    message: string, 
    error?: ZodFormattedError<unknown>
}
): ErrorResponse => {

    return {
        success: false,
        error: {
            status: 'fail',
            message: message,
            validationError: error ? error : null
        }
    }
}