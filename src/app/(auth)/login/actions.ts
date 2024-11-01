"use server"

import { signIn } from "@/auth"
import { getUserByEmail } from "@/lib/users"
import { LoginSchema, LoginValues } from "@/schema"
import { AuthError } from "next-auth"

export const login = async (values: LoginValues) => {

    const { email, password } = LoginSchema.parse(values)

    const existingUser = await getUserByEmail(email)
    if (!existingUser) return { error: "User not found" }

    try {
        await signIn("credentials", { email, password, redirectTo: '/' })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Invalid credentials" };
            }
        }

        throw error;
    }
}