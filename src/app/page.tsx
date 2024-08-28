import Navbar from "@/components/navbar";
import { auth, signOut } from "../../auth";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="flex gap-4">
        <p>Home</p>
      </main>
    </>
  );
}
