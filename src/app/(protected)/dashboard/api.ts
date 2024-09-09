import instance from "@/lib/instance";
import { AnimeResponse } from "@/types/anime";

async function getAnimes(page: number, size: number): Promise<AnimeResponse> {
  try {
    const response = await instance.get(
      `/api/v1/animes/all?page=${page}&size=${size}`,
    );
    return response.data as AnimeResponse;
  } catch (error) {
    console.error("Error fetching animes:", error);
    throw error;
  }
}

async function deleteAnime(id: number): Promise<void> {
  await instance.delete(`/api/v1/animes/${id}`);
}

export { getAnimes, deleteAnime };
