import { Component, Input } from '@angular/core';
import { IndexComponent } from './eventoIndex/index.component';
//import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { RouterModule } from '@angular/router';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';


/* plantilla que aparecerá en pantalla */
@Component({
  selector: 'app-root',
  standalone: true,

  template: `
  <main>
    <header class="nombre-proyecto">
      <img class="logo-proyecto" src="/assets/logoCommunity.png" alt="logo" aria-hidden="true">
    </header>

    <section class="contenido">
      <router-outlet></router-outlet>
    </section>
  </main>`,
  styleUrl: './app.component.css',
  imports: [IndexComponent, RouterModule, AutenticacionComponent]
})
export class AppComponent {

  title = 'project-community';
}
