import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import FormRegister from "@/components/auth/form-register";

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <FormRegister />;
}
