import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaEventos } from '../lista-eventos';
import { Observable } from 'rxjs';


/* Servicio (lugar centralizado de funciones o datos) */
@Injectable({
  providedIn: 'root'
})
export class ObservadorService {

  private apiUrl = "http://localhost:8000/api";




  //constructor() { }
  constructor(private http: HttpClient) { }

  getListaEventosById(id: number): Observable<ListaEventos>{
    return this.http.get<ListaEventos>(`${this.apiUrl}/evento/${id}`);
  }

  obtenerEventos(): Observable<ListaEventos[]>{
    return this.http.get<ListaEventos[]>(`${this.apiUrl}/evento`);
  }

  crearEvento(nombreEvento: string,  tipoEvento: string, admin: boolean, fecha: string, elementos: string):
  Observable<ListaEventos>{
    const cuerpoEvento = {
      nombre: nombreEvento,
      tipo: tipoEvento,
      admin: admin,
      fecha: fecha,
      elementos: elementos
    };
    return this.http.post<ListaEventos>(`${this.apiUrl}/crearEvento`, cuerpoEvento);
  }

}




/* protected observadorEventosLista: ListaEventos[] = [
    {
      "id": 0,
      "nombre": "Cumpleaños de Sara",
      "tipo": "Cumpleaños",
      "imagen": "/assets/cumpleaños.png",
      "asistencia": true,
      "fecha": new Date (2024,2,12),
      "personas": ["Sara", "Miguel", "Juan", "Ana", "Sofía"],
      "elementos": ["Globos", "Bebida", "Comida", "Regalo"],
    },

    {
      "id": 1,
      "nombre": "Comida de empresa",
      "tipo": "Comida",
      "imagen": "/assets/foto-brindis.png",
      "asistencia": false,
      "fecha": new Date (2024,4,20),
      "personas": ["Ángel", "Jose", "María", "Ana"],
      "elementos": ["Entrada", "Traje"],
    },

    {
      "id": 2,
      "nombre": "Viaje Francia",
      "tipo": "Viaje",
      "imagen": "/assets/viaje.jpg",
      "asistencia": true,
      "fecha": new Date (2024,7,10),
      "personas": ["Ángel", "Jose", "María", "Ana"],
      "elementos": ["Billetes", "Pasaporte", "DNI"],
    },

  ]; */
