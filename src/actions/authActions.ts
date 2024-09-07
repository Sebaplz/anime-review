"use server";

import { loginSchema, registerSchema } from "@/lib/zod";
import { z } from "zod";
import { signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";
import instance from "@/lib/instance";

export async function handleCredentialsSignin(
  values: z.infer<typeof loginSchema>,
) {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Error 500" };
  }
}

export async function handleCredentialsSignup(
  values: z.infer<typeof registerSchema>,
) {
  try {
    const response = await instance.post("/api/v1/auth/register", {
      username: values.username,
      email: values.email,
      password: values.password,
    });

    if (response.status === 200) {
      return await handleCredentialsSignin({
        email: values.email,
        password: values.password,
      });
    } else {
      return { error: response.data.error || "Error en el registro" };
    }
  } catch (error: any) {
    if (error.response?.data?.error) {
      return { error: error.response.data.error };
    }
    return { error: "Error 500" };
  }
}

export async function handleSignOut() {
  await signOut();
}
