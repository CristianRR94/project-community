import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ObservadorService } from '../servicios/observador.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ListaEventos } from '../lista-eventos';

@Component({
  selector: 'app-mod-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
    <section class="seccion">
    <h2 class="formularioEvento">Modificar Evento</h2>
  <form method="post" [formGroup]="applyForm" (submit)="modificarEvento()">

    <label for="nombreEvento">Nombre del evento</label>
    <input id="nombreEvento" type="text" formControlName="introducirNombreEvento">

    <label for="nombre">Tipo de evento</label>
    <select class="seccion" id="tipoEvento"  formControlName="introducirTipo">
      <option *ngFor="let tipo of tipos" [value]="tipo">{{ tipo }}</option>
    </select>
    <div *ngIf="applyForm.value.introducirTipo=='Otro'">
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
  styleUrl: './mod-evento.component.css'
})
export class ModEventoComponent {

  constructor(private observadorService: ObservadorService, private router: Router, private route: ActivatedRoute) { }

  public tipos: string[]=[];
  ngOnInit(): void {
    this.tipos = [
       "Cumpleaños",
       "Viaje",
       "Cena",
       "Comida",
       "Reunión",
       "Cita",
       "Otro",];
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
modificarEvento(){
  const listaEventosId = Number(this.route.snapshot.params['id']);
  this.evento.nombre = this.applyForm.value.introducirNombreEvento ?? "";
      const tipoEvento = this.applyForm.value.introducirTipo;
      if(tipoEvento == "7"){
        this.evento.tipo = this.applyForm.value.otroTipo ?? "Otro";
      }
      else {

        this.evento.tipo = this.applyForm.value.introducirTipo ?? "";
      }

      this.evento.administrador = this.applyForm.value.admin ?? false;
      this.evento.fecha = this.applyForm.value.introducirFecha ?? new Date().toString().substring(0, 10);
      this.evento.elementos = this.applyForm.value.introducirElemento?.split(",") ?? [];
      this.observadorService.modificarEvento(this.evento, listaEventosId).subscribe({
        next: (response: ListaEventos[]) =>{
        console.log("Evento modificado", response);
        this.router.navigateByUrl("/index");
      },
      error: (error: any) => {console.log("error", error)
     }
    });
}

volverIndex(){
  this.router.navigateByUrl("/index");
}

}
