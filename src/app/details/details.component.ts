import { ObservadorService } from './../observador.service';
import { ListaEventos } from './../lista-eventos';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
   <article>
    <img class="listado-imagen" [src]="listaEventos?.imagen" >
    <section class="listado-descripcion">
      <h2 class="listado-encabezado">{{listaEventos?.nombre}}</h2>
      <p class="listado-evento">{{listaEventos?.tipo}}, {{listaEventos?.fecha}}</p>
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
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject (ActivatedRoute);
  observadorService = inject(ObservadorService);
  listaEventos: ListaEventos | undefined;

  constructor(){
    const listaEventosId = Number(this.route.snapshot.params["id"])

    this.listaEventos = this.observadorService.getListaEventosById(listaEventosId);
  }
}
