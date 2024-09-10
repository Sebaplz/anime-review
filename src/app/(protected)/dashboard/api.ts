import instance from "@/lib/instance";
import { AnimeResponse, UpdateAnime, UpdateAnimeResponse } from "@/types/anime";

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

async function createAnime(
  animeData: UpdateAnime,
): Promise<UpdateAnimeResponse> {
  try {
    const response = await instance.post(`/api/v1/animes/create`, animeData);
    return response.data as UpdateAnimeResponse;
  } catch (error) {
    console.error("Error creating animes:", error);
    throw error;
  }
}

async function updateAnime(
  animeData: UpdateAnime,
  id: number,
): Promise<UpdateAnimeResponse> {
  try {
    const response = await instance.put(`/api/v1/animes/${id}`, animeData);
    return response.data as UpdateAnimeResponse;
  } catch (error) {
    console.error("Error updating animes:", error);
    throw error;
  }
}

export { getAnimes, deleteAnime, createAnime, updateAnime };
