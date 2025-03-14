import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/User';
import connectDB from '@/lib/db';

connectDB();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        const { name, email } = user;
        
        // Check allowed domains
        const allowedDomains = ['gmail.com', 'outlook.com', 'yahoo.com'];
        const domain = email.split('@')[1];
        if (!allowedDomains.includes(domain)) {
          return false;
        }

        // Check if user exists
        let existingUser = await User.findOne({ email });
        
        if (!existingUser) {
          existingUser = await User.create({
            name,
            email,
            verified: true
          });
        }
        
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    }
  }
});