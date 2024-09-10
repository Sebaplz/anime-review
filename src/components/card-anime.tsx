import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Anime } from "@/types/anime";
import { DialogDelete } from "./dialog-delete";
import { AnimeFormDialog } from "@/app/(protected)/dashboard/_components/anime-form-dialog";

interface CardAnimeProps {
  anime: Anime;
  onDelete?: (id: number, title: string) => void;
  isAdmin: boolean;
}

export function CardAnime({ anime, onDelete, isAdmin }: CardAnimeProps) {
  return (
    <Card
      key={anime.id}
      className="flex flex-col sm:flex-row md:h-[350px] lg:w-[400px]"
    >
      <CardHeader className="p-0 sm:w-[150px] xl:w-[200px]">
        <div className="relative aspect-[3/4] w-full sm:h-full">
          <img
            src={anime.urlImage}
            alt={anime.title}
            className="absolute inset-0 h-full w-full rounded-l-md object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h2 className="mb-2 text-xl font-bold text-black">{anime.title}</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {anime.genres.map((genre, index) => (
              <span key={index} className="text-xs text-cyan-400">
                {genre.name}
              </span>
            ))}
          </div>
          <div className="mb-4">
            {isAdmin ? (
              <p className="line-clamp-3">{anime.synopsis}</p>
            ) : (
              <p className="line-clamp-6">{anime.synopsis}</p>
            )}
          </div>
        </div>
        {isAdmin && (
          <div className="mt-auto flex gap-2">
            <AnimeFormDialog
              anime={anime}
              triggerButton={
                <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
                  Editar
                </Button>
              }
            />
            {onDelete && <DialogDelete anime={anime} onDelete={onDelete} />}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
