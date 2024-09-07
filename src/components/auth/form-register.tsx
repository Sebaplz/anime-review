"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "../loading-button";
import { handleCredentialsSignup } from "@/actions/authActions";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const response = await handleCredentialsSignup(values);
    if (response?.error) {
      setError(response.error);
    } else {
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-5 mx-10 flex-col justify-center gap-2 space-y-4 rounded-r-lg border-transparent bg-transparent align-middle md:flex lg:min-w-96"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <h1 className="mb-4 flex justify-center align-middle font-bold decoration-indigo-950 md:mb-10 md:text-lg lg:text-xl">
                Registro de usuario
              </h1>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de usuario" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@ejemplo.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormMessage>{error}</FormMessage>}
        <div className="flex flex-col">
          <LoadingButton
            pending={form.formState.isSubmitting}
            label="Registrarse"
          />
          <div className="flex justify-between">
            <Button variant="link">
              <Link href="/" className="hover:text-sky-500">
                Volver al Inicio
              </Link>
            </Button>
            <Button variant="link">
              <Link href="/login" className="hover:text-sky-500">
                Ya tengo cuenta
              </Link>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FormRegister;
