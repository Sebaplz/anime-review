import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Anime } from "@/types/anime";

export function DialogDelete({
  anime,
  onDelete,
}: {
  anime: Anime;
  onDelete: (id: number, title: string) => void;
}) {
  const handleConfirmDelete = () => {
    onDelete(anime.id, anime.title);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-md bg-destructive px-4 py-2 text-white">
        Eliminar
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">
            ¿Estás seguro de que deseas eliminar el anime {anime.title}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es permanente y no podrá ser revertida.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black">Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDelete}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
