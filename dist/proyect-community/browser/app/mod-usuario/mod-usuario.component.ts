
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrearUsuario } from '../../../crear-usuario';
import { UsuarioService } from '../servicios/servicios-login/usuario.service';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../servicios/servicios-login/post.service';
@Component({
  selector: 'app-mod-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
   <section class="seccion">
    <h2 class="formularioUsuario">Registrar Nuevo Usuario</h2>
  <form [formGroup]="applyUser" (submit)="modUsuario()">
    <div>
      <label for="nombreUsuario">Nombre de Usuario</label>
      <input id="nombreUsuario" type="text" formControlName="introducirNombreUsuario">
    </div>
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" formControlName="introducirEmail"
      autocomplete="email">
    </div>
    <div>
    <label for="contrasena">Contraseña</label>
    <input id="contrasena" type="password" formControlName="introducirContrasena">
    </div>
    <button type="submit" class="primary">Aceptar</button>
    <button type="button" class="primary" (click)="atras()">Atrás</button>
  </form>

  </section>
  `,
  styleUrl: './mod-usuario.component.css'
})
export class ModUsuarioComponent {

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  usuario: CrearUsuario = {
    name: "",
    email: "",
    password: ""
  };
  applyUser = new FormGroup({

    introducirNombreUsuario: new FormControl(""),
    introducirEmail: new FormControl(""),
    introducirContrasena: new FormControl(""),
  });

  modUsuario(){

    this.usuario.name = this.applyUser.value.introducirNombreUsuario ?? "";
    this.usuario.email = this.applyUser.value.introducirEmail ?? "";
    this.usuario.password = this.applyUser.value.introducirContrasena ?? "";
    this.usuarioService.modUsuario(this.usuario);

  }

  atras(){
    this.router.navigateByUrl("/index");
  }



}
