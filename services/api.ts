import { deleteStorageItemAsync, getStorageItemAsync } from "@/utils/useStorageState";

import axios from "axios";

const api = axios.create({
  baseURL:
    "https://chefbox-api-dotnet-hgekdketbqdrevbg.eastus-01.azurewebsites.net/api", // URL base do backend local
  timeout: 5000, // Tempo limite para requisições (opcional)
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

api.interceptors.request.use(async (config) => {
  const jwt = await getStorageItemAsync("jwt");

  if (jwt) {
    config.headers.Authorization = "Bearer " + jwt;
  }

  return config;
});

// Intercepta respostas para tratar erros 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove o token inválido
      deleteStorageItemAsync("jwt");
    }
    return Promise.reject(error);
  }
);
