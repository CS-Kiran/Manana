import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connectDB from "@/lib/db";
import bcrypt from "bcrypt"; 

connectDB();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials.email.trim().toLowerCase();
          const password = credentials.password.trim();

          const user = await User.findOne({ email }).lean();

          if (!user) {
            throw new Error("User not found");
          }

          if (user.provider === "credentials") {
            if (!user.password) {
              throw new Error("Password not set for credentials user");
            }

            const isPasswordValid = await bcrypt.compare(
              password,
              user.password
            );

            if (!isPasswordValid) {
              throw new Error("Invalid password");
            }
          } else if (user.provider === "google") {
            throw new Error("Please sign in with Google");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            provider: user.provider,
          };
        } catch (error) {
          console.error("Authorization error:", error.message);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const { email } = user;

        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
          if (existingUser.provider !== "google") {
            // Return false to redirect to error page with suitable message
            return false;
          }
          user.id = existingUser._id;
          return true;
        }

        const newUser = await User.create({
          name: profile.name,
          email,
          provider: "google",
          googleId: profile.sub,
          emailVerified: new Date(),
        });

        user.id = newUser._id;
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.provider = user.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
