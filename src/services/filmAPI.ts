import apiClient from "./apiClient";

export const getFilmsByCategory = async (category: string) => {
  const response = await apiClient.get(`/movie/${category}`, {
    params: { language: "en-US", page: "1" },
  });
  return response.data;
};

export const getFilmsDetails = async (id: number) => {
  const response = await apiClient.get(`/movie/${id}`, {
    params: { language: "en-US", page: "1" },
  });
  return response.data;
};
