import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { z } from 'zod';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                const { email, password } = parsedCredentials.data ? parsedCredentials.data : { email: '', password: '' };
                const user = { id: "1", name: "John Smith", email: "john@example.com" };
                if (email === user.email && password === "password") {
                    return user;
                }
                return null;
            }
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };