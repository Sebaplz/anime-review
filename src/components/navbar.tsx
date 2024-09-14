"use client";

import Link from "next/link";
import PerfilImg from "./navbar/perfil-img";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);

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
          <PerfilImg session={session} />
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
