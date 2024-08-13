export interface BaseTable<T> {
  data: T[];
}

export interface Lista {
  id: number;
  nome: string;
  sigla: string;
  pais: string;
  ativo: boolean;
}
