"use server"

import { db } from "./prisma";

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findFirst({ where: { id } })
        return user;
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findFirst({ where: { email } })
        return user;
    } catch (error) {
        console.log(error)
        return null
    }
}
