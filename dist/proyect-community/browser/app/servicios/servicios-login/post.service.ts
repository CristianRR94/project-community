
import { CrearUsuario } from '../../../../crear-usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {



  private apiURL = "http://localhost:8000/api";
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  guardarUsuario(usuario: CrearUsuario): Observable<any> {
    return this.http.post(this.apiURL, usuario);
  }

  modificarUsuario(usuario: CrearUsuario): Observable<any> {
    const usuarioId = Number(this.route.snapshot.params['id'])
    return this.http.put(`${this.apiURL}/usuarios/editar/${usuarioId}`, usuario,{ headers: this.getAuthHeaders()});
  }

  logout(): Observable<any>{
    const usuarioId = Number(this.route.snapshot.params['id']);
    return this.http.post(`${this.apiURL}/logout/${usuarioId}`, { headers: this.getAuthHeaders()});
  }
  borrarToken(){
    localStorage.removeItem("token");
  }
}
