import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEventosComponent } from '../lista-eventos/lista-eventos.component';
import { ListaEventos } from '../lista-eventos';
import { ObservadorService } from '../servicios/observador.service';
import { Router, RouterModule } from '@angular/router';
import { NuevoEventoComponent } from '../nuevo-evento/nuevo-evento.component';
import { FormsModule } from '@angular/forms';


/* presenta inputs y los eventos */
/* Decorador */
@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, ListaEventosComponent, RouterModule, NuevoEventoComponent, FormsModule],
  template: `
  <!-- Inputs -->
    <section>
      <form>
        <div>
          <a [routerLink]='[""]'>Cerrar sesión</a>
        </div>
      </form>
    </section>
    <section>
      <form>
        <label for ="buscar">Filtrar Eventos</label>
        <select class="primary" [(ngModel)]= "filtrar" name="todos" id="buscar" (change)="filtrarEventos()">
          <option value="todos">Todos</option>
          <option *ngFor="let tipo of tipos" [value]="tipo">{{ tipo }}</option>
        </select>
      </form>
    </section>
    <!-- Eventos (array)-->
    <section class="resultados">

      <app-lista-eventos [listaEventos]="listaEventosListado"></app-lista-eventos>
    </section>
    <section>

        <button class="primary" type="button" id="crearNuevo" (click)="newEvent()">Crear nuevo evento</button>

    </section>

  `,
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{

listaEventosListado: ListaEventos []= [];
eventosFiltrado: ListaEventos[]= [];
filtrar: string = "";
tipos: string[]= ["Cumpleaños", "Viaje", "Cena", "Comida", "Reunion", "Cita", "Otro"];

constructor(private router: Router, private observadorService: ObservadorService) { }
// obtener elementos
ngOnInit(){
  this.observadorService.obtenerEventos().subscribe({
    next: (respuesta: any)=>{
      if(respuesta.eventos){
        this.listaEventosListado = respuesta;
        this.eventosFiltrado = this.listaEventosListado;
      }

      else {
        console.log(respuesta);
        this.listaEventosListado = [];
        this.eventosFiltrado = [];
    }},
    error: (error: any)=>{
      console.log("Error al obtener eventos", error)
      this.listaEventosListado = [];
    }
  });

}
  //no funciona(id-string)
filtrarEventos(){
  if(this.filtrar && this.filtrar != "todos"){

    this.eventosFiltrado = this.listaEventosListado.filter(evento =>
      evento.tipo = this.filtrar
    );
  }
  else {
    this.eventosFiltrado = this.listaEventosListado;
  }
}


  newEvent(){
      this.router.navigateByUrl("/nuevo-evento");
  }
}
