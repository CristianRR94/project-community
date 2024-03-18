

import { Component } from '@angular/core';
import { NuevoUsuarioComponent } from '../nuevo-usuario/nuevo-usuario.component';
import { EventoComponent } from '../evento/evento.component';
import { Router } from '@angular/router';
import { AutenticacionService, DataInicioSesion } from '../servicios/servicios-autenticacion/autenticacion.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [EventoComponent, NuevoUsuarioComponent, ReactiveFormsModule],
  template: `
   <section>
      <form method="post" [formGroup] = "inicio" (submit)= "autenticarUsuario()">
        <div class="ctexto">
          <input type="text" class="usu" placeholder="Usuario" formControlName="readName">
          <input type="text" class="con" placeholder="contraseña" formControlName="readPassword">
        </div>

        <div class="buttons">
          <button class="inicio" type="submit" id="inicio" >Iniciar Sesión</button>

          <button class="crear" type="button" id="crear" (click)="login()">Crear cuenta</button>
        </div>
      </form>
    </section>
  `,
  styleUrl: './autenticacion.component.css'
})
export class AutenticacionComponent {

  dataInicioSesion: DataInicioSesion = {name: "", password: ""}

  constructor (private router: Router, private autenticacionService: AutenticacionService){ }

  inicio= new FormGroup({
    readName: new FormControl,
    readPassword: new FormControl,
  });

  autenticarUsuario(){
    const name = this.inicio.get("readName")?.value;
    const password = this.inicio.get("readPassword")?.value;

    if (!name) {
      console.error("Introduce nombre");
      return;
    };

    if (!password) {
      console.error("Introduce Contraseña");
      return;
    };

    this.dataInicioSesion.name = this.inicio.get("readName")?.value;
    this.dataInicioSesion.password = this.inicio.get("readPassword")?.value;

    this.autenticacionService.iniciarSesion(this.dataInicioSesion).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.token);
        console.log(response);
        this.router.navigateByUrl("/evento");
      },
    });
  }

  login(){
    this.router.navigateByUrl("/nuevo-usuario");
  }
}
