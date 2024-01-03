
import { Routes } from "@angular/router";
import { EventoComponent } from "./evento/evento.component";
import { DetailsComponent } from "./details/details.component";
const routeConfig: Routes = [{
  path: "",
  component: EventoComponent,
  title: "Home Page",
},
{
  path: "details/:id",
  component: DetailsComponent,
  title: "details page"
}];

export default routeConfig;
