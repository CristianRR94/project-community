

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEventosComponent } from '../lista-eventos/lista-eventos.component';
import { ListaEventos } from '../lista-eventos';
import { ObservadorService } from '../servicios/observador.service';
import { Router, RouterModule } from '@angular/router';
import { NuevoEventoComponent } from '../nuevo-evento/nuevo-evento.component';



/* presenta inputs y los eventos */
/* Decorador */
@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, ListaEventosComponent, RouterModule, NuevoEventoComponent],
  template: `
  <!-- Inputs -->
    <section>
      <form>
        <div>
          <a [routerLink]='[""]'>Cerrar sesión</a>
        </div>
      </form>
    </section>
    <section>
      <form>
        <input type="text" placeholder="Filtrar por eventos">
        <button class="primary" type="button" id="buscar">Buscar</button>
      </form>
    </section>
    <!-- Eventos (array)-->
    <section class="resultados">
      <app-lista-eventos *ngFor="let listaEventos of listaEventosListado" [listaEventos] = "listaEventos"></app-lista-eventos>
    </section>
    <section>
    <button class="crearNuevo" type="button" id="crearNuevo" (click)="newEvent()">Crear nuevo evento</button>
    </section>

  `,
  styleUrl: './evento.component.css'
})
export class EventoComponent {
listaEventosListado: ListaEventos [] = [];
observadorService: ObservadorService = inject (ObservadorService);




constructor(private router: Router) {
  this.listaEventosListado = this.observadorService.getAllListaEventos();
}
  newEvent(){
    this.router.navigateByUrl("/nuevo-evento");

}


}
