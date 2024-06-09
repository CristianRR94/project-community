import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FechaService } from '../servicios/fecha.service';
import { ObservadorService } from '../servicios/observador.service';
import { ListaEventos } from './../lista-eventos';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Participantes } from '../participantes';
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
      <p class="listado-evento">{{listaEventos?.tipo}}, {{listaEventos?.fecha}}</p>
    </section>
    <section class="listado-arrays">
      <h2 class="listado-participantes">Participantes</h2>
      <table>
        <tr>
          <th> Nombre</th>
        </tr>
        <tr *ngFor="let persona of listaParticipantes">
          <td>{{persona.participante}}</td>
        </tr>
      </table>
    </section>
    <section class="listado-asistencia">
      <h3>Administradores: {{listaEventos?.administrador ? "Todos" : "Creador"}}</h3>
      <div *ngIf="listaEventos?.administrador == true && listaParticipantes?.[0]">
        <button type="button" class="primary" (click)="addParticipantes()">Añadir Participantes</button>
        <button type="button" class="primary" (click)="goToModEvento()">Modificar Evento</button>
      </div>
      <div *ngIf="listaParticipantes?.[0]">
      <button  type="button" class="primary" (click)="confirmEliminarEvento()">Eliminar Evento</button>
      </div>
    </section>
   </article>
  `,
  styleUrl: './details.component.css',
  providers: [FechaService, DatePipe]
})
export class DetailsComponent implements OnInit{

  listaEventos: ListaEventos | undefined;
  listaParticipantes?: Participantes [];


  constructor(private router: Router, private route: ActivatedRoute, private observadorService: ObservadorService){
    //establecer los parámetros de la ruta (lo que cambia -> la id)
    const listaEventosId = Number(this.route.snapshot.params["id"])
    //mostrar elementos
    this.observadorService.getListaEventosById(listaEventosId).subscribe(eventos => {
      this.listaEventos = eventos;
    });
  }
  //añadir participante
  addParticipantes(): void{
    const listaEventosId = Number(this.route.snapshot.params["id"]);
    this.router.navigateByUrl(`crear-participantes/${listaEventosId}`);
  }

  goToModEvento(){
    const listaEventosId = Number(this.route.snapshot.params["id"]);
    this.router.navigateByUrl(`modificar-evento/${listaEventosId}`)
  }

  confirmEliminarEvento(){
    const confirmar = confirm("¿Seguro que quieres eliminar este evento?");
    if (confirmar){
      this.eliminarEvento();
    }

  }
  eliminarEvento(){
    const listaEventosId = Number(this.route.snapshot.params["id"]);
    this.observadorService.eliminarEvento(listaEventosId).subscribe({
      next: () => {console.log();
      this.router.navigateByUrl('/index');
    },
    error: (err) => {
      console.error("Error al eliminar evento", err);
    }});
  }

 /*   primerParticipante(): boolean{
    const token = this.observadorService.primerParticipante() ;
    return this.listaParticipantes?[0] ==
  } */

  //obtener los participantes por cada evento
  ngOnInit(): void{
    const listaEventosId = Number(this.route.snapshot.paramMap.get('id'));
    this.observadorService.obtenerParticipantes(listaEventosId).subscribe(participantes=> {
      this.listaParticipantes = participantes;
      console.log(this.listaEventos?.tipo)
    });

  }


}
