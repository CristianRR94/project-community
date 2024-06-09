import { response } from 'express';
import { ObservadorService } from './../servicios/observador.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Participantes } from '../participantes';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
   <section>
    <form method="post" [formGroup]="applyForm" (submit)="addParticipante()">
      <label for="nombreParticipante">Introduce nombre:</label>
      <input type="text" formControlName="introducirParticipante" placeholder="Nombre">
      <button type="submit" class="primary">Añadir</button>
    </form>
      <button type="button" class="primary" (click)="volverDetails()">Volver</button>
   </section>
  `,
  styleUrl: './participantes.component.css'
})
export class ParticipantesComponent {

constructor(private route: ActivatedRoute, private observadorService: ObservadorService, private router: Router) { }

private nuevoParticipante: Participantes = {
  participante: ""
};

applyForm = new FormGroup({
  introducirParticipante: new FormControl("")
})
addParticipante(){  //enviar id del evento y nombre del participanye
  const listaEventosId = Number(this.route.snapshot.params['id']);
  this.nuevoParticipante.participante = this.applyForm.value.introducirParticipante ?? "";
  this.observadorService.addParticipantes(listaEventosId, this.nuevoParticipante.participante).subscribe();
  this.applyForm.reset();
}

volverDetails(){
this.router.navigateByUrl("/details/:id");

}

ngOnInit(){
  const listaEventosId = Number(this.route.snapshot.params["id"]);

}
}
