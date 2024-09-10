import AnimeList from "@/components/anime-list";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <AnimeList isAdmin={false} />
    </>
  );
}
