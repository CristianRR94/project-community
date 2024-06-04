import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';



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
  styleUrls: ['./app.component.css'],
  imports: [RouterModule]
})
export class AppComponent {

  title = 'project-community';
}
