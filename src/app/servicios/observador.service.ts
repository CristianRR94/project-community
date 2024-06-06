import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaEventos } from '../lista-eventos';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Participantes } from '../participantes';


/* Servicio (lugar centralizado de funciones o datos) */
@Injectable({
  providedIn: 'root'
})
export class ObservadorService {

  private apiUrl = "http://localhost:8000/api";

  //constructor() { }
  constructor(private http: HttpClient) { }

  //comprueba que exista el token para realizar acciones
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getListaEventosById(id: number): Observable<ListaEventos>{
    //no hace falta mapear
    return this.http.get<any>(`${this.apiUrl}/evento/${id}`, { headers: this.getAuthHeaders() });


  }
    //mostrar los eventos en "detalles"
  obtenerEventos(): Observable<ListaEventos[]>{
    // mapear los eventos para que solo devuelvan el mensaje de la api
    return this.http.get<any>(`${this.apiUrl}/evento`, { headers: this.getAuthHeaders()}).pipe(
      map(response =>{
        const eventos = response.mensaje;
       return eventos.map((evento: any) => ({
        id: evento.id,
        nombre: evento.nombre,
        tipo: evento.tipo,
        fecha: new Date(evento.fecha),
        personas: evento.personas,
        administrador: evento.administrador
      }))})
    )

    /* const eventos: ListaEventos[] = [
      { id: 1, nombre: 'Cumpleaños de Juan', tipo: 'Cumpleaños', administrador: true, fecha: new Date() },
      { id: 2, nombre: 'Viaje a la playa', tipo: 'Viaje', administrador: false, fecha: new Date() }
    ]; */

  }

  //
  crearEvento(evento: ListaEventos): Observable<any>{

  return this.http.post(`${this.apiUrl}/evento`, evento, { headers: this.getAuthHeaders() });
  }
  //añadir participante
  addParticipantes(eventoId: number, nombrePersona: string): Observable<any>{
    const persona = {nombreParticipante: nombrePersona};
    return this.http.post(`${this.apiUrl}/evento/${eventoId}/participante`, persona, { headers: this.getAuthHeaders() });
  }

  // ver los participantes en "detalles"
  obtenerParticipantes(eventoId: number): Observable<Participantes[]>{

    return this.http.get<any>(`${this.apiUrl}/evento/${eventoId}/participantes`, { headers: this.getAuthHeaders()}).pipe(
      map(response => {return response.mensaje;}));

  }
}

