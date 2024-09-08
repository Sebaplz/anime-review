"use client";

import AnimeList from "@/components/anime-list";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnime } from "./api";

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
        description: `Error eliminando el anime: ${error}`,
      });
      console.error("Error deleting anime:", error);
    }
  };
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Anime Dashboard</h1>
      <AnimeList isAdmin={true} onDelete={handleDelete} />
    </div>
  );
}
