

import { ListaEventos } from '../lista-eventos';
import { ObservadorService } from '../servicios/observador.service';
import { Component, OnInit,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FechaService } from '../servicios/fecha.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  template: `
    <section class="listado"  *ngIf="listaEventos ">
    <div *ngFor="let evento of listaEventos">
      <img class="listado-imagen" [src]="tipoImagen [evento.tipo]" alt="Imagen de {{evento.nombre}}">
      <h2 class="listado-encabezado">{{evento.nombre}}</h2>
      <p class="listado-evento">{{evento.tipo}}, {{evento.fecha}}</p>
      <a [routerLink]="['/details', evento.id]">Información</a>

      </div>
    </section>
  `,
  styleUrls: ['./lista-eventos.component.css'],
  providers: [DatePipe, FechaService]
})
export class ListaEventosComponent implements OnInit{
  @Input() listaEventos: ListaEventos[] = [];



  //tipo de inidice al combobox
  tipoImagen: { [key: string]: string}= {
    "Cumpleaños": 'assets/cumpleaños.png',
    "Viaje": "assets/viaje.jpg",
    "Cena": "url_de_imagen_de_cena",
    "Comida": "url_de_imagen_de_comida",
    "Reunion": "",
    "Cita": "",
    "Otro": "url_de_imagen_de_otro"
  };

  constructor (public fechaService: FechaService, private observadorService: ObservadorService) {}
  ngOnInit(){

    this.observadorService.obtenerEventos().subscribe((data: ListaEventos[]) => {
        this.listaEventos = data;
      });

  }
}
