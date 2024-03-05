import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
    eliminarMensaje(){
      this.mostrarMensaje = false;
    }

}
