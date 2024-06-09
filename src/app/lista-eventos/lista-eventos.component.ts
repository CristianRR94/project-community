

import { ListaEventos } from '../lista-eventos';
import { ObservadorService } from '../servicios/observador.service';
import { Component, OnInit,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FechaService } from '../servicios/fecha.service';
import { Input } from '@angular/core';


@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  template: `
    <section class="listado"  *ngIf="listaEventos.length; else mensaje">
    <div *ngFor="let evento of listaEventos">
    <a [routerLink]="['/details', evento.id]">
      <img class="listado-imagen" [src]="tipoImagen[evento.tipo]" alt="Imagen de {{evento.nombre}}">
      <h2 class="listado-encabezado">{{evento.nombre}}</h2>
      <p class="listado-evento">{{evento.tipo}}, {{evento.fecha}}</p>
      </a>
      </div>

    </section>

    <ng-template #mensaje>
      <h1 class="textoAviso">No hay eventos</h1>
    </ng-template>
  `,
  styleUrls: ['./lista-eventos.component.css'],
  providers: [DatePipe, FechaService]
})
export class ListaEventosComponent implements OnInit{
  //input para conectar con index
  @Input() listaEventos: ListaEventos[] = [];



  //tipo de inidice al combobox
  tipoImagen: {[key: string]: string }= {
    "Cumpleaños": "assets/cumpleaños.png", //cumpleaños
    "Viaje": "assets/viaje.jpg",  // viaje
    "Cena": "assets/foto-brindis.png", //cena
    "Comida": "assets/foto-brindis.png", //comida
    "Reunion": "assets/partyB.png", //Reunion
    "Cita": "", // cita
    "Otro": "assets/foto-brindis.png" //otro
  };
  //asignar nombr al valor


  constructor (public fechaService: FechaService, private observadorService: ObservadorService, private route: ActivatedRoute) { }

  ngOnInit(){

       //obtener id usuario y id evento
    this.observadorService.obtenerEventoParticipante().subscribe({
      next: (data: ListaEventos[]) => {
        this.listaEventos = data;
        //console.log("imagen", this.tipoImagen)
      },
      error: (error) => {
        console.error(error);
        this.listaEventos= [];
      }
    });
  }

  getTipoImagen(tipo: string): string {

    return this.tipoImagen[tipo];
  }


}
