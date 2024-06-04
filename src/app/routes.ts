import { CrearUsuario } from './../../crear-usuario';
import { authGuard } from './auth.guard';
import { Routes } from "@angular/router";
import { IndexComponent } from "./eventoIndex/index.component";
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
  path: "index",
  component: IndexComponent,
  title: "Home Page",
  canActivate: [authGuard]
},
{
  path: "details/:id",
  component: DetailsComponent,
  title: "details page",
  canActivate: [authGuard]
},
{
  path: "nuevo-evento",
  component: NuevoEventoComponent,
  title: "new event page",
  canActivate: [authGuard]
},
{
  path: "nuevo-usuario",
  component: NuevoUsuarioComponent,
  title: "new user page"
},
{path: "**", redirectTo: ""}
];

export default routeConfig;
