import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Participantes } from '../participantes';
import { RouterModule, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
   <section>
    <form method="post" [formGroup]="applyForm" (submit)="addParticipante()">
      <label for="nombreParticipante">Introduce nombre:</label>
      <input type="text" formControlName="introducirParticipante">
      <button type="submit" class="primary">Añadir</button>
    </form>
   </section>
  `,
  styleUrl: './participantes.component.css'
})
export class ParticipantesComponent {

constructor(private route: ActivatedRoute) { }

private nuevoParticipante: Participantes = {
  participante: []
};

applyForm = new FormGroup({
  introducirParticipante: new FormControl("")
})
addParticipante(){
  const listaEventosId = Number(this.route.snapshot.params['id']);
  if(this.nuevoParticipante){}
  this.nuevoParticipante.participante = this.applyForm.value.introducirParticipante?.split(",") ?? [];
  console.log(this.nuevoParticipante);
}

ngOnInit(){
  const listaEventosId = Number(this.route.snapshot.params["id"]);

}
}
