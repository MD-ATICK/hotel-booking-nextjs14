import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { db } from "./lib/prisma";
import { getUserById } from "./lib/users";


export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "credentials") {
                const existingUser = await getUserById(String(user.id))
                if (!existingUser) return false

                return true;
            }

            return true;
        },
        async jwt({ token }) {
          
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token;

            token.username = existingUser.username
            token.emailVerified = existingUser.emailVerified;

            return token;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            session.user.username = token.username as string
            session.user.emailVerified = token.emailVerified as Date
            return session;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})