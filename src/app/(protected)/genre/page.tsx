import { GenreForm, GenreList } from "./_components";

export default function Genre() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="mb-8 text-4xl font-bold text-gray-800">
        Gestión de Géneros
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <GenreForm />
        <GenreList />
      </div>
    </main>
  );
}
