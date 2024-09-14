import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogOutButton() {
  return (
    <Button variant="destructive" onClick={() => signOut()}>
      Cerrar Sesión
      <LogOut className="ml-2 h-4 w-4" />
    </Button>
  );
}
