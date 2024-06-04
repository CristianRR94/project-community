

import { CommonModule } from '@angular/common';
import { ObservadorService } from '../servicios/observador.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ListaEventos } from '../lista-eventos';
import { response } from 'express';
import { error } from 'console';
import { IGX_COMBO_DIRECTIVES } from 'igniteui-angular';

@Component({
  selector: 'app-nuevo-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, IGX_COMBO_DIRECTIVES],
  template: `
  <!-- Formulario -->
  <section class="seccion">
    <h2 class="formularioEvento">Crear Evento</h2>
  <form method="post" [formGroup]="applyForm" (submit)="crearEvento()">

    <label for="nombreEvento">Nombre del evento</label>
    <input id="nombreEvento" type="text" formControlName="introducirNombreEvento">

    <label for="nombre">Tipo de evento</label>
    <igx-combo
      id="tipoEvento" [data]='tipo' valueKey="nombreTipo"
      displayKey="nombreTipo" formControlName="introducirTipo">
    </igx-combo>

    <label for= "asistencia">Solo creador como administrador</label>
    <input class="checkbox" type="checkbox" value="1" formControlName="admin">
    <label for="fecha">Fecha</label>
    <input id="fecha" type="date" formControlName="introducirFecha">

    <label for="nombreObjeto">Elementos</label>
    <input id="nombreObjeto" type="text" formControlName="introducirElemento">
    <button type="submit" class="primary">Aceptar</button>
    <button type="button" class="primary" (click)="volverIndex()">Cancelar</button>
  </form>

  </section>
  `,
  styleUrl: './nuevo-evento.component.css'
})

export class NuevoEventoComponent implements OnInit {

  constructor(private observadorService: ObservadorService, private router: Router, private route: ActivatedRoute){ }

    //observadorService = inject(ObservadorService);

    public tipo: {nombreTipo: string, idTipo: number}[]=[];
    ngOnInit(): void {
      this.tipo = [
        {nombreTipo: "Compleaños", idTipo: 1},
         {nombreTipo: "Viaje", idTipo: 2},
         {nombreTipo: "Cena", idTipo: 3},
         {nombreTipo: "Comida", idTipo: 4},
         {nombreTipo: "Viaje", idTipo: 5},
         {nombreTipo: "Otro", idTipo: 6}];
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
