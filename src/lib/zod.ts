import { object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "El email es requerido" })
    .min(1, "El email es requerido")
    .email("El email es invalido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener más de 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
});

export const registerSchema = object({
  username: string({ required_error: "El nombre de usuario es requerido" })
    .min(1, "El nombre de usuario es requerido")
    .max(32, "El nombre de usuario debe tener menos de 32 caracteres"),
  email: string({ required_error: "El email es requerido" })
    .min(1, "El email es requerido")
    .email("El email es invalido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(8, "La contraseña debe tener más de 8 caracteres")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string({ required_error: "Confirm password is required" })
    .min(8, "Confirmar contraseña debe tener más de 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Las contraseñas no coinciden",
});
