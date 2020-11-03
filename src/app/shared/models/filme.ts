export interface Filme {
  id?: number;
  titulo: string;
  urlFoto?: string;
  dtLancamento: Date;
  descricao?: string;
  nota: number;
  urlIMDb?: string;
  genero: string;
}
// ? significa opcional 
// exatamente os mesmos nomes do banco 