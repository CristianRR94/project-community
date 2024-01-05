import { CommonModule } from '@angular/common';
import { ObservadorService } from './../observador.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-nuevo-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
  <!-- Formulario -->
  <section class="seccion">
    <h2 class="formularioEvento">Crear Evento</h2>
  <form [formGroup]="applyForm" (submit)="submitApplication()">

    <label for="nombreEvento">Nombre del evento</label>
    <input id="nombreEvento" type="text" formControlName="introducirNombreEvento">

    <label for="nombre">Nombre invitado</label>
    <input id="nombre" type="text" formControlName="introducirNombre">

    <label for="fecha">Fecha</label>
    <input id="fecha" type="text" formControlName="introducirFecha">

    <label for="nombreObjeto">Nombre objetos</label>
    <input id="nombreObjeto" type="text" formControlName="introducirObjetos">
    <button type="submit" class="primary">Aceptar</button>
  </form>
  </section>
  `,
  styleUrl: './nuevo-evento.component.css'
})
export class NuevoEventoComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  observadorService = inject(ObservadorService);

  applyForm = new FormGroup({

    introducirNombreEvento: new FormControl(""),
    introducirNombre: new FormControl(""),
    introducirFecha: new FormControl(""),
    introducirObjetos: new FormControl(""),

  });
  submitApplication(){
    this.observadorService.submitApplication(
      this.applyForm.value.introducirNombreEvento ?? "",
      this.applyForm.value.introducirNombre ?? "",
      this.applyForm.value.introducirFecha ?? "",
      this.applyForm.value.introducirObjetos ?? "",

    )
  }
}
