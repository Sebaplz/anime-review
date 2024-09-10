"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, X } from "lucide-react";
import { useState } from "react";
import { deleteGenre, getGenres, updateGenre } from "../api";
import { GenreEditForm } from "./genre-edit-form";

export function GenreList() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [editingGenre, setEditingGenre] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(0, 40),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
  });

  const handleDelete = async (id: number, name: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({
        title: "Éxito",
        description: `El género: ${name} se eliminó con éxito`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Error eliminando el género!`,
        variant: "destructive",
      });
      console.error("Error deleting genre:", error);
    }
  };

  const handleUpdate = async (id: number, newName: string) => {
    try {
      await updateMutation.mutateAsync({ id, name: newName });
      toast({
        title: "Éxito",
        description: `El género se actualizó con éxito`,
      });
      setEditingGenre(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Error actualizando el género!`,
        variant: "destructive",
      });
      console.error("Error updating genre:", error);
    }
  };

  if (isError)
    return <p className="text-destructive">Error al cargar los géneros</p>;

  return (
    <Card>
      <CardHeader className="bg-secondary text-secondary-foreground">
        <CardTitle>Lista de Géneros</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data?.content.map((genre) => (
              <Dialog key={genre.id}>
                <Button
                  variant={selectedGenre === genre.name ? "default" : "outline"}
                  className="transition-all duration-200 ease-in-out"
                  onClick={() => setSelectedGenre(genre.name)}
                >
                  {genre.name}
                  {selectedGenre === genre.name && (
                    <>
                      <DialogTrigger asChild>
                        <Pencil
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingGenre({ id: genre.id, name: genre.name });
                          }}
                        />
                      </DialogTrigger>
                      <X
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(genre.id, genre.name);
                          setSelectedGenre(null);
                        }}
                      />
                    </>
                  )}
                </Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar Género</DialogTitle>
                  </DialogHeader>
                  <GenreEditForm
                    genreId={genre.id}
                    initialName={genre.name}
                    onSubmit={(newName) => handleUpdate(genre.id, newName)}
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
