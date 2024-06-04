

import { ListaEventos } from '../lista-eventos';
import { ObservadorService } from '../servicios/observador.service';
import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FechaService } from '../servicios/fecha.service';


@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  template: `
    <section class="listado" *ngFor="let evento of listaEventos">
      <img class="listado-imagen" [src]="tipoImagen [evento.tipo]" alt="Imagen de {{evento.nombre}}">
      <h2 class="listado-encabezado">{{evento.nombre}}</h2>
      <p class="listado-evento">{{evento.tipo}}, {{fechaService.transformDate(evento.fecha)}}</p>
      <a [routerLink]="['/details', evento.id]">Información</a>
    </section>
  `,
  styleUrls: ['./lista-eventos.component.css'],
  providers: [DatePipe, FechaService]
})
export class ListaEventosComponent implements OnInit{
  listaEventos: ListaEventos[]=[];

  //tipo de inidice al combobox
  tipoImagen: { [key: string]: string}= {
    "Cumpleaños": "url_de_imagen_de_cumpleaños",
    "Viaje": "url_de_imagen_de_viaje",
    "Cena": "url_de_imagen_de_cena",
    "Comida": "url_de_imagen_de_comida",
    "Otro": "url_de_imagen_de_otro"
  };

  constructor (public fechaService: FechaService, private observadorService: ObservadorService) {}
  ngOnInit(){
    this.observadorService.obtenerEventos().subscribe((data: ListaEventos[]) => {
        this.listaEventos = data.map(evento => ({
          ...evento, imagen: this.tipoImagen[evento.tipo]   // ...evento spread operator: copia las propiedades de un objeto a otro
        }));
      });
  }
}
