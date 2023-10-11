import { type UserType } from "./users";

declare global{
    namespace Express {
        interface Request {
            currentUser: UserType['data']
        }
    }
}

export interface JwtPayload {
    id: number;
}