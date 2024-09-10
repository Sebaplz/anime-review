import { createAnime, updateAnime } from "@/app/(protected)/dashboard/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Anime, UpdateAnime } from "@/types/anime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getGenres } from "../../genre/api";

interface AnimeFormDialogProps {
  anime?: Anime;
  triggerButton: React.ReactNode;
}

export function AnimeFormDialog({
  anime,
  triggerButton,
}: AnimeFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<UpdateAnime>({
    title: anime?.title ?? "",
    urlImage: anime?.urlImage ?? "",
    synopsis: anime?.synopsis ?? "",
    releaseYear: anime?.releaseYear ?? new Date().getFullYear(),
    genres: anime?.genres.map((genre) => ({ id: genre.id })) ?? [],
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(0, 100),
  });

  const mutation = useMutation({
    mutationFn: anime
      ? (data: UpdateAnime) => updateAnime(data, anime.id)
      : (data: UpdateAnime) => createAnime(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animes"] });
      toast({
        title: "Éxito",
        description: anime
          ? `El anime se actualizó con éxito`
          : `El anime se añadió con éxito`,
      });
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: anime
          ? `Error actualizando el anime!`
          : `Error añadiendo el anime!`,
        variant: "destructive",
      });
      console.error(
        anime ? "Error updating anime:" : "Error adding anime:",
        error,
      );
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "releaseYear" ? parseInt(value) : value,
    }));
  };

  const handleGenreChange = (genreId: string) => {
    const id = parseInt(genreId);
    setFormData((prev) => {
      const newGenres = prev.genres.some((g) => g.id === id)
        ? prev.genres.filter((g) => g.id !== id)
        : [...prev.genres, { id }];
      return { ...prev, genres: newGenres };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {anime ? "Editar Anime" : "Añadir Nuevo Anime"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="urlImage">URL de la imagen</Label>
            <Input
              id="urlImage"
              name="urlImage"
              value={formData.urlImage}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="synopsis">Sinopsis</Label>
            <Textarea
              id="synopsis"
              name="synopsis"
              value={formData.synopsis}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="releaseYear">Año de lanzamiento</Label>
            <Input
              id="releaseYear"
              name="releaseYear"
              type="number"
              value={formData.releaseYear}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Géneros</Label>
            <Select onValueChange={handleGenreChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona géneros" />
              </SelectTrigger>
              <SelectContent>
                {genres?.content.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.genres.map((genre) => {
                const genreName = genres?.content.find(
                  (g) => g.id === genre.id,
                )?.name;
                return (
                  <Button
                    key={genre.id}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleGenreChange(genre.id.toString())}
                  >
                    {genreName} ✕
                  </Button>
                );
              })}
            </div>
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending
              ? anime
                ? "Actualizando..."
                : "Añadiendo..."
              : anime
                ? "Actualizar Anime"
                : "Añadir Anime"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
