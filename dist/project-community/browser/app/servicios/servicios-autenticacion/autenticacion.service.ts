import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'console';
import { response } from 'express';
import { tap } from 'rxjs';

export type DataInicioSesion = {
  name:string,
  email?: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {


  constructor(private http: HttpClient) { }

  private apiURL = "http://localhost:8000/api";


  iniciarSesion(data: DataInicioSesion){

      return this.http.post(`${this.apiURL}/autenticar`, data).pipe(
        tap((response: any) =>{
          localStorage.setItem("token", response.token)

    })
  );
};

  cerrarSesion(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });

    return this.http.post(`${this.apiURL}/logout`, {});
  }
}
