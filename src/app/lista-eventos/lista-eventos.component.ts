import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEventos } from '../lista-eventos';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listado">
      <img class="listado-imagen" [src]="listaEventos.imagen" alt="Imagen de {{listaEventos.nombre}}">
      <h2 class="listado-encabezado">{{listaEventos.nombre}}</h2>
      <p class="listado-evento">{{listaEventos.tipo}}, {{listaEventos.fecha}}</p>
      <a [routerLink]='["/details", listaEventos.id]'>Información</a>
    </section>
  `,
  styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent {
  @Input() listaEventos!:ListaEventos;
}
