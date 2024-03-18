
import { CrearUsuario } from '../../../../crear-usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {



  private apiURL = "http://localhost:8000/api/usuarios";
  constructor(private http: HttpClient) { }

  guardarUsuario(usuario: CrearUsuario): Observable<any> {
    return this.http.post(this.apiURL, usuario);
  }

}
