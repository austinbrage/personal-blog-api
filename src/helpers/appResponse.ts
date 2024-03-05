import { RowDataPacket, ResultSetHeader } from "mysql2"
import type { OkResponse, ErrorResponse } from "../types/api"
import { ZodFormattedError } from "zod"

export const createOkResponse = ({
    message, 
    token,
    data
}: {
    message: string 
    token?: string
    data?: RowDataPacket[] | ResultSetHeader[]
}
): OkResponse => {

    return {
        success: true,
        result: {
            message: message,
            data: data ? data : null,
            token: token ? token : null
        }
    }
}

export const createErrorResponse = ({
    message,
    error
}: {
    message: string 
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