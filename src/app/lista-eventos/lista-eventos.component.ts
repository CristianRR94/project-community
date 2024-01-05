import { ListaEventos } from './../lista-eventos';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FechaService } from '../fecha.service';

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  template: `
    <section class="listado">
      <img class="listado-imagen" [src]="listaEventos.imagen" alt="Imagen de {{listaEventos.nombre}}">
      <h2 class="listado-encabezado">{{listaEventos.nombre}}</h2>
      <p class="listado-evento">{{listaEventos.tipo}}, {{fechaService.transformDate(listaEventos.fecha)}}</p>
      <a [routerLink]='["/details", listaEventos.id]'>Información</a>
    </section>
  `,
  styleUrl: './lista-eventos.component.css',
  providers: [DatePipe, FechaService]
})
export class ListaEventosComponent {
  @Input() listaEventos!:ListaEventos;

  constructor (public fechaService: FechaService) {}


}
