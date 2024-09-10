import instance from "@/lib/instance";
import { Genre, GenreResponse } from "@/types/anime";

async function getGenres(page: number, size: number): Promise<GenreResponse> {
  try {
    const response = await instance.get(
      `/api/v1/genres/all?page=${page}&size=${size}`,
    );
    return response.data as GenreResponse;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
}

async function createGenre(genreData: { name: string }): Promise<Genre> {
  try {
    const response = await instance.post("/api/v1/genres/create", genreData);
    return response.data as Genre;
  } catch (error) {
    console.error("Error creating genre:", error);
    throw error;
  }
}

export async function updateGenre({ id, name }: Genre): Promise<Genre> {
  try {
    const response = await instance.put(`/api/v1/genres/${id}`, { name });
    return response.data as Genre;
  } catch (error) {
    console.error("Error updating genre:", error);
    throw error;
  }
}

async function deleteGenre(id: number): Promise<void> {
  await instance.delete(`/api/v1/genres/${id}`);
}

export { getGenres, createGenre, deleteGenre };
