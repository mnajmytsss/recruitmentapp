import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; // Import bcrypt
import UserAccount from "@/models/userAccountModels";
import { connectToDB } from "@/dbConfig/dbConfig";

connectToDB();

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,

  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user: any = await UserAccount.findOne({ email }).exec();

          if (user) {
            const passwordConfirmed = await bcrypt.compare(password, user.password);
            if (passwordConfirmed) {
              return user;
            }
          }

          return null;
        } catch (error) {
          console.error("Error in authorize:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "credentials" && user) {
        const userData = await UserAccount.findOne({ email: user.email });
        if (userData) {
          token._id = userData._id;
          token.email = userData.email;
          token.name = userData.name;
          token.picture = userData.picture;
        }
      }
      return token;
    },
    
    async session({ session, token }: any) {
      if ("_id" in token) {
        session.user._id = token._id;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("picture" in token) {
        session.user.picture = token.picture;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
