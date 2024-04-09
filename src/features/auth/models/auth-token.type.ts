import { User } from "../../../models/types";

export type AuthToken = User & {
    iat: number;
    exp: number;
}