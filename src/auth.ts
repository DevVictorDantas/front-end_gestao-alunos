const CHAVE = "pge:token";

export const salvarToken = (token: string): void => {
  localStorage.setItem(CHAVE, token);
};

export const limparToken = (): void => {
  localStorage.removeItem(CHAVE);
};

export const lerToken = (): string | null => {
  return localStorage.getItem(CHAVE);
};

export const estaLogado = (): boolean => {
  return lerToken() !== null;
};
