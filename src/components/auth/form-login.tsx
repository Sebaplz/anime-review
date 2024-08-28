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
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: "/",
    });

    if (result?.error) {
      setError(
        "Las credenciales son incorrectas, por favor, inténtalo de nuevo.",
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-5 mx-10 flex-col justify-center gap-5 space-y-8 rounded-r-lg border-transparent bg-transparent align-middle text-black md:flex lg:min-w-96"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <h1 className="flex justify-center align-middle font-bold decoration-indigo-950 md:text-lg lg:text-xl">
                Inicio de sesión
              </h1>
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
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="bg-indigo-950">
          Iniciar sesión
        </Button>
      </form>
    </Form>
  );
};

export default FormLogin;
