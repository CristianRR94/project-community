import { AvisoComponent } from './aviso/aviso.component';
import { Injectable } from '@angular/core';
import { CrearUsuario } from './crear-usuario';
import { MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public dialog: MatDialog) { }

  submitUsuario(usuario: CrearUsuario ){

      if (this.validarUsuario(usuario.nombre, usuario.email, usuario.contrasena)){
    console.log(usuario.nombre, usuario.email, usuario.contrasena);
  }

  }


    validarUsuario(introducirUsuario: string, introducirEmail: string, introducirContrasena: string){
      const regexUsuario = /^[a-zA-Z0-9]{3,}$/
      const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      const regexContrasena = /.{6,}/;

      let validar = [
        {test: !introducirUsuario, execute: () => this.dialog.open(AvisoComponent, {data: {message: "Introduce nombre de usuario"}})},
        {test: !introducirEmail, execute: () => this.dialog.open(AvisoComponent, {data: {message: "Introduce Email"}})},
        {test: !introducirContrasena, execute: () => this.dialog.open(AvisoComponent, {data: {message: "Introduce Contraseña"}})},
        {test: !regexUsuario.test(introducirUsuario), execute: () => this.dialog.open(AvisoComponent, {data: {message: "El nombre de usuario debe contener al menos 3 caracteres entre letras y cifras"}})},
        {test: !regexEmail.test(introducirEmail), execute: () => this.dialog.open(AvisoComponent, {data: {message: "Introduce Email válido"}})},
        {test: !regexContrasena.test(introducirContrasena), execute: () => this.dialog.open(AvisoComponent, {data: {message: "La contraseña debe contener al menos 6 caracteres"}})},
      ]

      for (let i = 0; i < validar.length; i++) {
        if (validar[i].test) {
          validar[i].execute();

          return false;
        }
    }
      return true;

  }

}

