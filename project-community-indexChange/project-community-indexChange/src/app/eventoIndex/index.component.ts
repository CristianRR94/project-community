import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEventosComponent } from '../lista-eventos/lista-eventos.component';
import { ListaEventos } from '../lista-eventos';
import { ObservadorService } from '../servicios/observador.service';
import { Router, RouterModule } from '@angular/router';
import { NuevoEventoComponent } from '../nuevo-evento/nuevo-evento.component';
import { FormsModule } from '@angular/forms';

/* Presenta inputs y los eventos */
/* Decorador */
@Component({
  selector: 'app-index', // Consistente con el nombre de la clase
  standalone: true,
  imports: [CommonModule, ListaEventosComponent, RouterModule, NuevoEventoComponent, FormsModule],
  template: `
  <!-- Inputs -->
  
   <!--
<section>
  <form>
    <div>
      <a [routerLink]='[""]'>Cerrar sesión</a>
    </div>
  </form>
</section>
-->

		<form>
		  <label for="buscar">Filtrar Eventos</label>
		  <select class="primary" [(ngModel)]="filtrar" name="todos" id="buscar" (change)="filtrarEventos()">
			<option value="todos">Todos</option>
			<option *ngFor="let tipo of tipos" [value]="tipo">{{ tipo }}</option>
		  </select>
		</form>
	  <section class="resultados">
		<app-lista-eventos [listaEventos]="eventosFiltrado"></app-lista-eventos> <!-- Corrigido -->
	  </section>
	  <section>
		  <button class="primary" type="button" id="crearNuevo" (click)="newEvent()">Crear nuevo evento</button>
		  <button class="primary" type="button" id="cerrarSesion" (click)="cerrarSesion()">Cerrar Sesión</button> <!-- Id corregido -->
	  </section>
  `,
  styleUrls: ['./index.component.css'] // Corregido
})
export class IndexComponent implements OnInit {

  listaEventosListado: ListaEventos[] = [];
  eventosFiltrado: ListaEventos[] = [];
  filtrar: string = "";
  tipos: string[] = ["Cumpleaños", "Viaje", "Cena", "Comida", "Reunion", "Cita", "Otro"];

  constructor(private router: Router, private observadorService: ObservadorService) { }

  // Obtener elementos
  ngOnInit() {
    this.observadorService.obtenerEventos().subscribe({
      next: (respuesta: any) => {
        if (respuesta.eventos) {
          this.listaEventosListado = respuesta.eventos; // Corregido
          this.eventosFiltrado = this.listaEventosListado;
        } else {
          console.log(respuesta);
          this.listaEventosListado = [];
          this.eventosFiltrado = [];
        }
      },
      error: (error: any) => {
        console.log("Error al obtener eventos", error);
        this.listaEventosListado = [];
      }
    });
  }

  // Filtrar eventos
  filtrarEventos() {
    if (this.filtrar && this.filtrar !== "todos") {
      this.eventosFiltrado = this.listaEventosListado.filter(evento => evento.tipo === this.filtrar); // Corregido
    } else {
      this.eventosFiltrado = this.listaEventosListado;
    }
  }

  // Navegar a nuevo evento
  newEvent() {
    this.router.navigateByUrl("/nuevo-evento");
  }

  // Navegar a la página de inicio (Cerrar sesión)
  cerrarSesion() {
    this.router.navigateByUrl("/inicio");
  }
}
