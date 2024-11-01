"use server"

import { signIn } from "@/auth"
import { db } from "@/lib/prisma"
import { getUserByEmail } from "@/lib/users"
import { SignUpSchema, SignUpValues } from "@/schema"
import { hashSync } from "bcryptjs"
import { AuthError } from "next-auth"

export const signUp = async (values: SignUpValues) => {

    const { name, email, password } = SignUpSchema.parse(values)

    const existingUser = await getUserByEmail(email)
    if (existingUser) return { error: "Email already exists" }

    const hashedPassword = hashSync(password, 10)

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    try {
        await signIn("credentials", { email, password, redirectTo: '/' })
        console.log('redirect now')
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something is wrong!" };
            }
        }
        throw error;
    }

}