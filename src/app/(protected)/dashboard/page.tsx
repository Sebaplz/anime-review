"use client";

import AnimeList from "@/components/anime-list";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnime } from "./api";
import { AnimeFormDialog } from "./_components/anime-form-dialog";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: deleteAnime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animes"] });
    },
  });

  const handleDelete = async (id: number, title: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({
        title: "Éxito",
        description: `El anime ${title} se eliminó con éxito`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Error eliminando el anime!`,
        variant: "destructive",
      });
      console.error("Error deleting anime:", error);
    }
  };

  return (
    <main className="flex flex-col items-end">
      <AnimeFormDialog
        triggerButton={
          <Button className="mx-4 bg-green-500 text-white hover:bg-green-600">
            Añadir Nuevo Anime
          </Button>
        }
      />
      <AnimeList isAdmin={true} onDelete={handleDelete} />
    </main>
  );
}
