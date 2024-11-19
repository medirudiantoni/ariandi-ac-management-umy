import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import UserWithRole from "@/types/user";

const prisma = new PrismaClient();

// Extend tipe bawaan NextAuth User untuk mendukung properti tambahan
declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    email: string;
    role: string;
  }
  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      role: string;
    };
  }
}

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // Cari user dengan email dan sertakan relasi role
        const user = (await prisma.user.findUnique({
          where: { email },
          include: { role: true },
        })) as UserWithRole | null;

        if (user) {
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (isValidPassword) {
            // Transformasikan ke tipe bawaan User NextAuth
            return {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role.title,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user = {
          id: token.id as number,
          username: token.username as string,
          email: token.email as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOption);