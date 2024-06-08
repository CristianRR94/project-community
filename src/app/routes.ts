import { CrearUsuario } from './../../crear-usuario';
import { authGuard } from './auth.guard';
import { Routes } from "@angular/router";
import { IndexComponent } from "./eventoIndex/index.component";
import { DetailsComponent } from "./details/details.component";
import { AutenticacionComponent } from "./autenticacion/autenticacion.component";
import { NuevoEventoComponent } from "./nuevo-evento/nuevo-evento.component";
import { NuevoUsuarioComponent } from "./nuevo-usuario/nuevo-usuario.component";
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { ParticipantesComponent } from './participantes/participantes.component';
import { ModEventoComponent } from './mod-evento/mod-evento.component';

const routeConfig: Routes = [{
path:"",
component: AutenticacionComponent,
title: "Autenticacion page",
},
{
  path: "modificar-evento/:id",
  component: ModEventoComponent,
  title: "Modify Event page",
  canActivate: [authGuard]
},
{
  path: "crear-participantes/:id",
  component: ParticipantesComponent,
  title: "Add participants page",
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
{
  path: "eventos",
  component: ListaEventosComponent,
  title: "Home Page",
  canActivate: [authGuard]
},
{
  path: "index",
  component: IndexComponent,
  title: "Home Page",
  canActivate: [authGuard]
},
{path: "**", redirectTo: ""}
];

export default routeConfig;
