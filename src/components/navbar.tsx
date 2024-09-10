import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, Pencil } from "lucide-react";
import Link from "next/link";
import { auth, signOut } from "../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between p-4">
      <Link href={"/"}>
        <img src="logo.png" alt="Logo" className="h-14 w-14 rounded-2xl" />
      </Link>
      {session?.user ? (
        <ul className="flex items-center gap-4">
          {session.user.role === "ADMIN" && (
            <>
              <li>
                <Link href={"/dashboard"} className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href={"/genre"} className="hover:underline">
                  Genero
                </Link>
              </li>
            </>
          )}
          <li>{session?.user?.username}!</li>
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src="avatar.png" />
                <AvatarFallback className="text-black">
                  {session.user.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="mr-10 mt-4 flex flex-col justify-center md:w-96">
              <img src="avatar.png" alt="Avatar" />
              <div className="flex flex-wrap justify-center gap-4 md:justify-between">
                <Button variant="secondary">
                  Cambiar Imagen
                  <Pencil className="ml-2 h-4 w-4" />
                </Button>
                <form
                  action={async () => {
                    "use server";
                    await signOut({
                      redirectTo: "/",
                    });
                  }}
                >
                  <Button variant="destructive" type="submit">
                    Cerrar Sesión
                    <LogOut className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </ul>
      ) : (
        <Link href="/login" className="hover:underline">
          Iniciar Sesión
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
