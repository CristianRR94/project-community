
import { CrearUsuario } from '../../../../crear-usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostService {



  private apiURL = "http://localhost:8000/api/usuarios";
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  guardarUsuario(usuario: CrearUsuario): Observable<any> {
    return this.http.post(this.apiURL, usuario);
  }

  modificarUsuario(usuario: CrearUsuario): Observable<any> {
    const usuarioId = Number(this.route.snapshot.params['id'])
    return this.http.put(`${this.apiURL}/editar/${usuarioId}`, usuario);
  }

}
