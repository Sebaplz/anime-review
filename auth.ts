import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/zod";
import axios from "axios";

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          // Hacer una solicitud al backend de Spring Boot
          const response = await axios.post("http://tu-backend-url/api/login", {
            email,
            password,
          });

          if (response.status === 200) {
            // Asumiendo que tu backend devuelve los datos del usuario
            const user = response.data;
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              // Otros campos que tu backend pueda devolver
            };
          } else {
            return null;
          }
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Validation error:", error.errors);
            return null;
          }
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Puedes agregar más campos al token si es necesario
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = (token.id as string).toString();
        // Puedes agregar más campos a la sesión si es necesario
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Página personalizada de inicio de sesión
  },
});
