import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(params) {
      const { profile } = params;
      try {
        await connectToDB();

        if (profile) {
          const existingUser = await User.findOne({ email: profile.email });
          if (!existingUser) {
            await User.create({
              name: profile.name,
              email: profile.email,
              avatar: profile.image
            });
          }
        } else {
          console.error("Profile is undefined");
        }
        console.log("profile:", profile);
      } catch (error) {
        console.error("Error saving user to database:", error);
      }
      return Promise.resolve(true);
    },
    async session({ session, token }) {
      if (session.user) {
        const user = await User.findOne({ email: session.user.email });
        session.user = user?._id.toString();
      }
      return session;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
