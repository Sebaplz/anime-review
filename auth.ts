import NextAuth, { CredentialsSignin, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import instance from "@/lib/instance";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await instance.post("/api/user/login", credentials);
          if (response.status === 200) {
            return response.data;
          }
          throw new Error("Credenciales inválidas");
        } catch (error) {
          console.error("Error de autenticación:", error);

          if (error.response && error.response.status === 401) {
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
    jwt({ token, user }: { token: JWT; user?: User }): JWT {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
