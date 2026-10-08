import axios from "axios";
import { lerToken, limparToken } from "./auth";

export const http = axios.create({
  baseURL: "http://127.0.1:8000",
  timeout: 8000,
});

export function mensagemErro(erro: unknown): string {
  if (axios.isAxiosError(erro)) {
    if (erro.response) {
      const { status, data } = erro.response;
      const detail = (data as { detail?: unknown } | undefined)?.detail;

      if (typeof detail === "string") return detail;
      if (Array.isArray(detail) && detail[0]?.msg) return String(detail[0].msg);

      if (status === 401) return "Sessão expirada. Faça login novamente";
      if (status === 403) return "Acesso negado";
      if (status === 404) return "Não encontrado";
      if (status === 500) return "Erro interno do servidor";
      return `Erro ${status}`;
    }

    if (erro.code === "ECONNABORTED") return "Tempo de resposta esgotado";
    return "Erro de rede";
  }

  return erro instanceof Error ? erro.message : "Ocorreu um erro inesperado";
}

http.interceptors.request.use((config) => {
  const token = lerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    const veioDoLogin = error.config?.url?.includes("login");
    if (status === 401 && !veioDoLogin) {
      limparToken();
      window.location.reload();
    }

    return Promise.reject(error);
  },
);
