import NextAuth from 'next-auth/next';
import Google from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  callbacks: {
    async session({ session, token }) {
      session.accessToken = (token.accessToken as string) || '';
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);