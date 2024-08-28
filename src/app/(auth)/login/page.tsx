import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import FormLogin from "@/components/auth/form-login";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <FormLogin />;
}
