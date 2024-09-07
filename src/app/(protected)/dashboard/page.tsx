import { CardAnime } from "@/components/card-anime";
import instance from "@/lib/instance";
import { AnimeResponse } from "@/types/anime";

async function getAnimes(): Promise<AnimeResponse | null> {
  try {
    const response = await instance.get("/api/v1/animes/all");
    return response.data as AnimeResponse;
  } catch (error) {
    console.error("Error fetching animes:", error);
    return null;
  }
}

export default async function Dashboard() {
  const animeResponse = await getAnimes();
  const animes = animeResponse?.content;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Anime Dashboard</h1>
      {animes ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {animes.map((anime, index) => (
            <CardAnime key={index} {...anime} />
          ))}
        </ul>
      ) : (
        <p>Failed to load animes.</p>
      )}
    </div>
  );
}
