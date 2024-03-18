import { CrearUsuario } from './../../crear-usuario';

import { Routes } from "@angular/router";
import { EventoComponent } from "./evento/evento.component";
import { DetailsComponent } from "./details/details.component";
import { AutenticacionComponent } from "./autenticacion/autenticacion.component";
import { NuevoEventoComponent } from "./nuevo-evento/nuevo-evento.component";
import { NuevoUsuarioComponent } from "./nuevo-usuario/nuevo-usuario.component";


const routeConfig: Routes = [{
path:"",
component: AutenticacionComponent,
title: "Autenticacion page",
},
  {
  path: "evento",
  component: EventoComponent,
  title: "Home Page",
},
{
  path: "details/:id",
  component: DetailsComponent,
  title: "details page"
},
{
  path: "nuevo-evento",
  component: NuevoEventoComponent,
  title: "new event page"
},
{
  path: "nuevo-usuario",
  component: NuevoUsuarioComponent,
  title: "new user page"
}
];

export default routeConfig;
