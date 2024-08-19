import { auth, signOut } from "../../auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen items-center justify-center gap-4">
      <h1>
        {session?.user
          ? `Hola ${session.user.email}!`
          : "Hola, no estas autenticado!"}
      </h1>

      {session?.user && (
        <>
          <p>Estás autenticado!</p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </>
      )}
    </main>
  );
}
