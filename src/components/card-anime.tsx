import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Anime } from "@/types/anime";

export function CardAnime(anime: Anime) {
  return (
    <Card key={anime.id} className="flex">
      <CardHeader className="p-0">
        <img
          src={anime.urlImage}
          alt={anime.title}
          className="h-[250px] w-[300px] rounded-t-lg object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="mb-2 text-xl font-bold text-black">{anime.title}</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {anime.genres.map((genre, index) => (
            <span key={index} className="text-xs text-cyan-400">
              {genre.name}
            </span>
          ))}
        </div>
        <div className="mb-4 flex gap-2">
          <Button className="bg-cyan-500 text-black hover:bg-cyan-600">
            Editar
          </Button>
          <Button variant="destructive">Eliminar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
