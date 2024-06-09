import { UsuarioService } from './../usuario.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrearUsuario } from '../crear-usuario';

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="seccion">
    <h2 class="formularioUsuario">Registrar Nuevo Usuario</h2>
  <form [formGroup]="applyUser" (submit)="submitUsuario()">
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
  </form>
  </section>
  `,
  styleUrl: './nuevo-usuario.component.css'


})
export class NuevoUsuarioComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  usuarioService = inject(UsuarioService);


  usuario: CrearUsuario = {
    nombre: "",
    email: "",
    contrasena: ""
  };
  applyUser = new FormGroup({

    introducirNombreUsuario: new FormControl(""),
    introducirEmail: new FormControl(""),
    introducirContrasena: new FormControl(""),
  });

  submitUsuario(){

    this.usuario.nombre = this.applyUser.value.introducirNombreUsuario ?? "";
    this.usuario.email = this.applyUser.value.introducirEmail ?? "";
    this.usuario.contrasena = this.applyUser.value.introducirContrasena ?? "";
    this.usuarioService.submitUsuario(this.usuario);
  }
}
