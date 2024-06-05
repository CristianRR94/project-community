
export interface ListaEventos {
  id?: number,
  nombre: string,
  tipo: string,
  imagen?: string,
  administrador: boolean,
  fecha: Date,
  personas?: string[],
  elementos?: string[],
  created_at?: string;
  updated_at?: string;
}


