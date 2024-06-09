import { Observable } from 'rxjs';

import { PostService } from './post.service';
import { CrearUsuario } from '../../../../crear-usuario';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private router: Router, private http: HttpClient) { }

   //inyección de dependencias
  postService = inject(PostService);
  private apiURL = "http://localhost:8000/api";
   //uso del tipo crear-usuario.ts
  submitUsuario(usuario: CrearUsuario ){
       //validación
    if (this.validarUsuario(usuario)){
      console.log(usuario.name, usuario.email, usuario.password);


          //envío de datos a la api si hay validación / Uso de un observable
      this.postService.guardarUsuario(usuario).subscribe({

        next: (response: any) => {
          console.log(response);
        },
        //error por consola
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.log("¡Usuario registrado con éxito!");
          this.router.navigateByUrl("");
        }
      });
    }
  }

     //comprobación de que el usuario introduce los datos correctos
  validarUsuario(usuario: CrearUsuario){
    const regexName = /^[a-zA-Z0-9]{3,}$/
    const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const regexPassword = /.{6,}/;

    //error específico (consola)
    let validar = [
      {test: !usuario.name, message: "Introduce nombre de usuario"},
      {test: !usuario.email, message: "Introduce Email"},
      {test: !usuario.password, message: "Introduce Contraseña"},
      {test: !regexName.test(usuario.name), message: "El nombre de usuario debe contener al menos 3 caracteres entre letras y cifras"},
      {test: !regexEmail.test(usuario.email), message: "Introduce Email válido"},
      {test: !regexPassword.test(usuario.password), message: "La contraseña debe contener al menos 6 caracteres"},
    ]

    for (let i = 0; i < validar.length; i++) {
      if (validar[i].test){
        console.log(validar[i].message);
        return false;
      }
    }
      return true;
   }

   //lo mismo pero para modificar
  modUsuario(usuario: CrearUsuario ){
    //validación
    if (this.validarUsuario(usuario)){
      console.log(usuario.name, usuario.email, usuario.password);


       //envío de datos a la api si hay validación / Uso de un observable
      this.postService.modificarUsuario(usuario).subscribe({

        next: (response: any) => {
        console.log(response);
        },
        //error por consola
        error: (error: any) => {
        console.error(error);
        },
        complete: () => {
        console.log("¡Usuario registrado con éxito!");
        this.router.navigateByUrl("");
        }
      });
    }
  }

  obtenerUsuario(id: number): Observable<any>{
   return this.http.get<any>(`${this.apiURL}/usuarios/${id}`)

  }

}
