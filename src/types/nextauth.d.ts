import { type DefaultSession } from "next-auth";


export type ExtendedUser = DefaultSession["user"] & {
    username?: string,
    emailVerified? : Date
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}