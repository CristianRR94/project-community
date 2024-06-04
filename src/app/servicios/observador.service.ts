import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaEventos } from '../lista-eventos';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';


/* Servicio (lugar centralizado de funciones o datos) */
@Injectable({
  providedIn: 'root'
})
export class ObservadorService {

  private apiUrl = "http://localhost:8000/api";

  //constructor() { }
  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getListaEventosById(id: number): Observable<ListaEventos>{
    return this.http.get<ListaEventos>(`${this.apiUrl}/evento/${id}`, { headers: this.getAuthHeaders() });
  }

  obtenerEventos(): Observable<ListaEventos[]>{
   /*  const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set(": ", `Bearer ${token}`); */
    return this.http.get<ListaEventos[]>(`${this.apiUrl}/evento`, { headers: this.getAuthHeaders()}).pipe(catchError(error=>{
      console.error(error);
      return of([]);
    })
  );}


  crearEvento(evento: ListaEventos): Observable<any>{

  return this.http.post(`${this.apiUrl}/evento`, evento, { headers: this.getAuthHeaders() });
  }

}

