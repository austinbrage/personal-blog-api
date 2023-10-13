import { type UserType } from "./users";

declare global{
    namespace Express {
        interface Request {
            userId: UserType['id']
        }
    }
}

export interface JwtPayload {
    id: number;
}