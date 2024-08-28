import instance from "@/lib/instance";
import { decodeToken } from "@/utils/jwt-decode";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Extend User and Session types
declare module "next-auth" {
  interface User {
    username: string;
    token: string;
  }

  interface Session {
    accessToken: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const response = await instance.post(
            "/api/v1/auth/authenticate",
            credentials,
          );
          if (response.status === 200) {
            const decodedToken = decodeToken(response.data.token);
            return {
              ...response.data.user,
              ...decodedToken,
              token: response.data.token,
            };
          }
          throw new Error("Credenciales inválidas");
        } catch (error) {
          console.error("Error de autenticación:", error);

          if (
            error instanceof Error &&
            error.response &&
            error.response.status === 401
          ) {
            throw new CredentialsSignin("Credenciales inválidas");
          }

          throw new Error(
            "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.",
          );
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.accessToken = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        username: token.username as string,
      };
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
