import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      // Create or update the settings when the user logs in
      const { id } = user;
      await prisma.setting.upsert({
        where: { userId: id },
        update: {},
        create: {
          userId: id,
          theme: "dark", // Set a default theme or customize based on your needs
        },
      });

      return true;
    },
  },
};

const nextAuthHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, options);

export default nextAuthHandler;
