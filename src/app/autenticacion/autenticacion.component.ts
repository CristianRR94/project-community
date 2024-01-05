import { Component } from '@angular/core';
//import { RouterModule } from '@angular/router';
import { EventoComponent } from '../evento/evento.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [EventoComponent],
  template: `
   <section>
      <form class="cuerpo">
        <div class="ctexto">
          <input type="text" class="usu" placeholder="Usuario">
          <input type="text" class="con" placeholder="contraseña">
        </div>

        <div class="buttons">
          <button class="inicio" type="button" id="buscar" (click)="goToEvento()">Iniciar Sesión</button>
          <!-- <a [routerLink]='["/evento"]'>pasar</a> -->
          <button class="crear" type="button" id="crear">Crear cuenta</button>
        </div>
      </form>
    </section>
  `,
  styleUrl: './autenticacion.component.css'
})
export class AutenticacionComponent {

  constructor (private router: Router){}

  goToEvento(){
    this.router.navigateByUrl("/evento");
  }
}
