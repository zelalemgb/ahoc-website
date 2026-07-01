import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

/**
 * Auth.js (NextAuth v5). Google sign-in with JWT sessions — enough for
 * accounts and "My tickets". Guest checkout does not require auth. A database
 * adapter + email magic-link can be added later without changing callers.
 *
 * Reads AUTH_SECRET, AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET from the env.
 */
const providers = [];
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(Google);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: { strategy: 'jwt' },
});
