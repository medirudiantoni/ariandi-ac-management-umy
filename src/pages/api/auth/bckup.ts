import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const authOption: NextAuthOptions =  {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials){
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await prisma.user.findUnique({ where: { email: email }, include: { role: true } });
                if(user){
                    const isValidPassword = await bcrypt.compare(password, user.password);
                    if(isValidPassword){
                        return user;
                    }
                    return null;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, user }: any){
            if(account?.provider === "credentials"){
                token.id = user.id
                token.username = user.username;
                token.email = user.email;
                token.role = user.role.title;
            }
            return token;
        },
        async session({ session, token }: any){
            if("id" in token){
                session.user.id = token.id;
            }
            if("username" in token){
                session.user.username = token.username;
            }
            if("email" in token){
                session.user.email = token.email;
            }
            if("role" in token){
                session.user.role = token.role;
            }
            return session;
        }
    }
};

export default NextAuth(authOption);