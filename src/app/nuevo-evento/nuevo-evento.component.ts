import { CommonModule } from '@angular/common';
import { ObservadorService } from '../servicios/observador.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListaEventos } from '../lista-eventos';
@Component({
  selector: 'app-nuevo-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
  <!-- Formulario -->
  <section class="seccion">
    <h2 class="formularioEvento">Crear Evento</h2>
  <form method="post" [formGroup]="applyForm" (submit)="crearEvento()">

    <label for="nombreEvento">Nombre del evento</label>
    <input id="nombreEvento" type="text" formControlName="introducirNombreEvento">

    <label for="nombre">Tipo de evento</label>
    <input id="nombre" type="text" formControlName="introducirTipo">

    <label for= "asistencia">Solo creador como administrador</label>
    <input class="checkbox" type="checkbox" value="1" formControlName="admin">
    <label for="fecha">Fecha</label>
    <input id="fecha" type="text" formControlName="introducirFecha">

    <label for="nombreObjeto">Elementos</label>
    <input id="nombreObjeto" type="text" formControlName="introducirElemento">
    <button type="submit" class="primary">Aceptar</button>
  </form>

  </section>
  `,
  styleUrl: './nuevo-evento.component.css'
})
export class NuevoEventoComponent {

  constructor(){ }
    route: ActivatedRoute = inject(ActivatedRoute);
    observadorService = inject(ObservadorService);

  evento: ListaEventos = {
    nombre: "",
    tipo: "",
    administrador: true,
    fecha: new Date
  }
  applyForm = new FormGroup({

    introducirNombreEvento: new FormControl(""),
    introducirTipo: new FormControl(""),
    admin: new FormControl(),
    introducirFecha: new FormControl(""),
    introducirElemento: new FormControl(""),

  });


  crearEvento(){
      this.evento.nombre = this.applyForm.value.introducirNombreEvento ?? "",
      this.evento.tipo = this.applyForm.value.introducirTipo ?? "";
      this.evento.administrador = this.applyForm.value.admin ?? "";
      this.evento.fecha = this.applyForm.value.introducirFecha ?? "";
      this.evento.elementos = this.applyForm.value.introducirElemento ?? "";
      this.observadorService.crearEvento(this.evento);

  }
}
