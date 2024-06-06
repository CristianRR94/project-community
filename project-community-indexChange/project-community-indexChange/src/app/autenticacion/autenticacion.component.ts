

import { Component } from '@angular/core';
import { NuevoUsuarioComponent } from '../nuevo-usuario/nuevo-usuario.component';
import { IndexComponent } from '../eventoIndex/index.component';
import { Router } from '@angular/router';
import { AutenticacionService, DataInicioSesion } from '../servicios/servicios-autenticacion/autenticacion.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [IndexComponent, NuevoUsuarioComponent, ReactiveFormsModule],
  template: `
   <section>
      <form method="post" [formGroup] = "inicio" (submit)= "autenticarUsuario()">
        <div class="ctexto">
          <input type="text" class="introBut" placeholder="Usuario" formControlName="readName">
          <input type="password" class="introBut" placeholder="Contraseña" formControlName="readPassword">
        </div>

        <div class="buttons">
          <button class="primary" type="submit" id="inicio" >Iniciar Sesión</button>

          <button class="primary" type="button" id="crear" (click)="login()">Crear cuenta</button>
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
        this.router.navigateByUrl("/index");
      },
    });
  }

  login(){
    this.router.navigateByUrl("/nuevo-usuario");
  }
}
