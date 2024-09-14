import instance from "@/lib/instance";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { decodeToken } from "@/utils/jwt-decode";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        try {
          const response = await instance.post("/api/v1/auth/authenticate", {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.status === 200 && response.data.token) {
            const decodedToken = decodeToken(response.data.token);
            return {
              ...response.data,
              ...decodedToken,
              token: response.data.token,
            };
          } else {
            throw new Error(response.data.error || "Autenticación fallida");
          }
        } catch (error: any) {
          if (error.response?.data?.error) {
            throw new Error(error.response.data.error);
          }
          console.error("Error de autenticación:", error);
          throw new Error("Error en la autenticación");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.role = user.role;
        token.picture = user.urlImage;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.user.role = token.role;
      session.user.urlImage = token.picture;
      return session;
    },
  },
});
