import axios from "axios";
import { lerToken, limparToken } from "./auth";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000",
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

// Quem for avisado quando a sessão cair (o App registra a função de sair).
let aoExpirar: () => void = () => {};

export function aoExpirarSessao(funcao: () => void): void {
  aoExpirar = funcao;
}

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    const veioDoLogin = error.config?.url?.includes("login");
    if (status === 401 && !veioDoLogin) {
      // Sessão vencida: limpa o token e volta para o login, sem mensagem.
      limparToken();
      aoExpirar();
      return new Promise(() => {}); // nunca resolve: a tela que chamou não mostra erro
    }

    return Promise.reject(error);
  },
);
