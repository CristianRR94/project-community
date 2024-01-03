

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEventosComponent } from '../lista-eventos/lista-eventos.component';
import { ListaEventos } from '../lista-eventos';
import { ObservadorService } from '../observador.service';


@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, ListaEventosComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filtrar por eventos">
        <button class="primary" type="button">Buscar</button>
      </form>
    </section>
    <section class="resultados">
      <app-lista-eventos *ngFor="let listaEventos of listaEventosListado" [listaEventos] = "listaEventos"></app-lista-eventos>
    </section>

  `,
  styleUrl: './evento.component.css'
})
export class EventoComponent {
listaEventosListado: ListaEventos [] = [];
observadorService: ObservadorService = inject (ObservadorService);

constructor() {
  this.listaEventosListado = this.observadorService.getAllListaEventos();
}


}
