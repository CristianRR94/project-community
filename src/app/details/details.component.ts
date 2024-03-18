import { FechaService } from '../servicios/fecha.service';
import { ObservadorService } from '../servicios/observador.service';
import { ListaEventos } from './../lista-eventos';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

/* Fichero donde se ven los detalles del evento */
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  template: `
   <article>
    <img class="listado-imagen" [src]="listaEventos?.imagen" >
    <section class="listado-descripcion">
      <h2 class="listado-encabezado">{{listaEventos?.nombre}}</h2>
      <p class="listado-evento">{{listaEventos?.tipo}}, {{fechaService.transformDate(listaEventos?.fecha)}}</p>
    </section>
    <section class="listado-arrays">
      <h2 class="listado-participantes">Participantes</h2>
      <table>
        <tr>
          <th> Nombre</th>
        </tr>
        <tr *ngFor="let persona of listaEventos?.personas">
          <td>{{persona}}</td>
        </tr>
      </table>
    </section>
    <section class="listado-asistencia">
      <h3>Asistencia: {{listaEventos?.asistencia ? "Si" : "No"}}</h3>
    </section>
   </article>
  `,
  styleUrl: './details.component.css',
  providers: [FechaService, DatePipe]
})
export class DetailsComponent {
  route: ActivatedRoute = inject (ActivatedRoute);
  observadorService = inject(ObservadorService);
  listaEventos: ListaEventos | undefined;
  applyForm = new FormGroup({

  })
  constructor(public fechaService: FechaService){
    const listaEventosId = Number(this.route.snapshot.params["id"])

    this.listaEventos = this.observadorService.getListaEventosById(listaEventosId);



  }
}
