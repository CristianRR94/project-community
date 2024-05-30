
export interface ListaEventos {
  id?: number,
  nombre: string,
  tipo: string,
  imagen?: string,
  administrador: boolean,
  fecha: Date,
  personas?: string[],
  elementos?: string[],
}


