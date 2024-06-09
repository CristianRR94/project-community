import { Component, Inject } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aviso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.css',
  template: "<h1 *ngIf='mostrarMensaje' (click)='eliminarMensaje()'>{{data.message}}</h1>"
})

export class AvisoComponent {

  mostrarMensaje = true;
  constructor() {}
    eliminarMensaje(){
      this.mostrarMensaje = false;
    }

}
