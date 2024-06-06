import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ObservadorService } from '../servicios/observador.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ListaEventos } from '../lista-eventos';
import { response } from 'express';
import { error } from 'console';


@Component({
  selector: 'app-nuevo-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
  <!-- Formulario -->
  <section class="seccion">
    <h2 class="formularioEvento">Crear Evento</h2>
  <form method="post" [formGroup]="applyForm" (submit)="crearEvento()">

    <label for="nombreEvento">Nombre del evento</label>
    <input id="nombreEvento" type="text" formControlName="introducirNombreEvento">

    <label for="nombre">Tipo de evento</label>
    <select class="seccion" id="tipoEvento"  formControlName="introducirTipo">
      <option *ngFor="let tipo of tipos" [value]="tipo.idTipo">{{ tipo.nombreTipo }}</option>
    </select>
    <div *ngIf="applyForm.value.introducirTipo=='7'">
      <input type="text" placeholder="Introduce tipo" formControlName="otroTipo">
    </div>
    <div>
      <label for= "asistencia" id="labelCaja">Solo creador como administrador</label>
      <input id="checkbox" type="checkbox" value="1" formControlName="admin">
    </div>
    <label for="fecha">Fecha</label>
    <input id="fecha" type="date" formControlName="introducirFecha">

    <label for="nombreObjeto">Elementos</label>
    <input id="nombreObjeto" type="text" formControlName="introducirElemento">
    <button type="submit" class="primary">Aceptar</button>
    <button type="button" class="primary" (click)="volverIndex()">Volver</button>
  </form>

  </section>
  `,
  styleUrl: './nuevo-evento.component.css'
})

export class NuevoEventoComponent implements OnInit {

  constructor(private observadorService: ObservadorService, private router: Router, private route: ActivatedRoute){ }

    //observadorService = inject(ObservadorService);

    public tipos: {nombreTipo: string, idTipo: number}[]=[];
    ngOnInit(): void {
      this.tipos = [
         {nombreTipo: "Compleaños", idTipo: 1},
         {nombreTipo: "Viaje", idTipo: 2},
         {nombreTipo: "Cena", idTipo: 3},
         {nombreTipo: "Comida", idTipo: 4},
         {nombreTipo: "Reunión", idTipo: 5},
         {nombreTipo: "Cita", idTipo: 6},
         {nombreTipo: "Otro", idTipo: 7}];
    }


  evento: ListaEventos = {
    nombre: "",
    tipo: "",
    administrador: true,
    fecha: new Date,
    elementos: []
  }
  applyForm = new FormGroup({

    introducirNombreEvento: new FormControl(""),
    introducirTipo: new FormControl(""),
    otroTipo: new FormControl(""),
    admin: new FormControl(),
    introducirFecha: new FormControl(),
    introducirElemento: new FormControl(""),

  });


  crearEvento(){
      /*     let fecha = this.applyForm.value.introducirFecha;
      if (fecha){
        this.evento.fecha = new Date(fecha);
      }
      else{
        this.evento.fecha = new Date(Date.now());
      }; */
      this.evento.nombre = this.applyForm.value.introducirNombreEvento ?? "";
      const tipoEvento = this.applyForm.value.introducirTipo;
      this.evento.tipo = tipoEvento ? tipoEvento: "";
      this.evento.administrador = this.applyForm.value.admin ?? false;
      this.evento.fecha = this.applyForm.value.introducirFecha ?? new Date().toString().substring(0, 10);
      this.evento.elementos = this.applyForm.value.introducirElemento?.split(",") ?? [];
      this.observadorService.crearEvento(this.evento).subscribe({
        next: (response: ListaEventos[]) =>{
        console.log("Evento creado", response);
      },
      error: (error: any) => {console.log("error", error)
     }
    });
  }

  volverIndex(){
    setTimeout(()=>{
      this.router.navigateByUrl("/index");
    }, 100);
  }
}
