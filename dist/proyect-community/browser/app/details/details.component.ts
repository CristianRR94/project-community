import { UsuarioService } from './../servicios/servicios-login/usuario.service';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FechaService } from '../servicios/fecha.service';
import { ObservadorService } from '../servicios/observador.service';
import { ListaEventos } from './../lista-eventos';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Participantes } from '../participantes';
import { response } from 'express';

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
      <h3>Administradores: {{listaEventos?.administrador ? "Creador" : "Todos"}}</h3>
      <div *ngIf="this.getEsAdmin()  == true || listaEventos?.administrador == false && this.getEsAdmin() == false">
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

  listaEventos?: ListaEventos;
  listaParticipantes?: Participantes [];
  esAdmin: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private observadorService: ObservadorService, private usuarioService: UsuarioService){
    //establecer los parámetros de la ruta (lo que cambia -> la id)
    const listaEventosId = Number(this.route.snapshot.params["id"])
    //mostrar elementos
    this.observadorService.getListaEventosById(listaEventosId).subscribe(eventos => {
      this.listaEventos = eventos;
    });
  }
  //añadir participante
  addParticipantes(){
    const listaEventosId = Number(this.route.snapshot.params["id"]);
    this.router.navigateByUrl(`crear-participantes/${listaEventosId}`);
  }

  goToModEvento(){
    const listaEventosId = Number(this.route.snapshot.params["id"]);
    this.router.navigateByUrl(`modificar-evento/${listaEventosId}`)
  }

  confirmEliminarEvento(){
    const eventoId = Number(this.route.snapshot.params["id"]);
    const confirmar = confirm("¿Seguro que quieres eliminar este evento?");
    if (confirmar){
      this.eliminarEvento(eventoId);
    }

  }
  eliminarEvento(eventoId: number){

    this.observadorService.deleteEvento(eventoId).subscribe({
      next: () => {
        alert("Evento eliminado con éxito");
      this.router.navigateByUrl('/index');
    },
    error: (err) => {
      if (err.status === 403) {
        console.error('No tienes permiso para eliminar este evento');
        alert('No tienes permiso para eliminar este evento');
      }
      else{
        console.error("Error al eliminar evento", err);
        alert("Error al eliminar evento");
      }

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
      //console.log(this.listaEventos?.tipo)


    const eventoId = Number(this.route.snapshot.paramMap.get('id'));
    this.observadorService.primerParticipante(eventoId).subscribe({
      next: (response: any) => {
        this.esAdmin = response && response.mensaje === true; // Asignación directa a esAdmin
        //console.log(response.mensaje === true ? "true" : "false", this.esAdmin);
      },
      error: (err) => {
        console.error("Error al obtener administrador", err);
      }
    });
    //console.log("sale",this.listaEventos?.administrador);
  });
  }
  getEsAdmin(): boolean{

  //console.log("Es admin", this.esAdmin)
  return this.esAdmin;
}

}
