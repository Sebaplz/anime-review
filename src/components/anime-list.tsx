"use client";
import { getAnimes } from "@/app/(protected)/dashboard/api";
import { useQuery } from "@tanstack/react-query";
import { CardAnime } from "./card-anime";
import ErrorView from "./error-view";
import SkeletonAnime from "./skeleton-anime";

interface AnimeListProps {
  isAdmin: boolean;
  onDelete?: (id: number, title: string) => void;
}

export default function AnimeList({ isAdmin, onDelete }: AnimeListProps) {
  const {
    data: animeResponse,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["animes"],
    queryFn: getAnimes,
  });
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <SkeletonAnime key={index} />
            ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorView error={error as Error} />;
  }

  const animes = animeResponse?.content || [];

  return (
    <>
      <div className="p-4">
        {animes.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {animes.map((anime) => (
              <CardAnime
                key={anime.id}
                anime={anime}
                onDelete={onDelete}
                isAdmin={isAdmin}
              />
            ))}
          </ul>
        ) : (
          <p>No hay animes disponibles.</p>
        )}
      </div>
    </>
  );
}
