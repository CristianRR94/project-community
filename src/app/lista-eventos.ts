
export interface ListaEventos {
  id: number,
  nombre: string,
  tipo: string,
  imagen: string,
  asistencia: boolean,
  fecha: Date,
  personas: string[],
  elementos: string[],
}
