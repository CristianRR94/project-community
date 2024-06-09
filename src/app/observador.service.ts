import { Injectable } from '@angular/core';
import { ListaEventos } from './lista-eventos';



/* Servicio (lugar centralizado de funciones o datos) */
@Injectable({
  providedIn: 'root'
})
export class ObservadorService {
  protected observadorEventosLista: ListaEventos[] = [
    {
      "id": 0,
      "nombre": "Cumpleaños de Sara",
      "tipo": "Cumpleaños",
      "imagen": "/assets/cumpleaños.png",
      "asistencia": true,
      "fecha": new Date (2024,2,12),
      "personas": ["Sara", "Miguel", "Juan", "Ana", "Sofía"],
      "elementos": ["Globos", "Bebida", "Comida", "Regalo"],
    },

    {
      "id": 1,
      "nombre": "Comida de empresa",
      "tipo": "Comida",
      "imagen": "/assets/foto-brindis.png",
      "asistencia": false,
      "fecha": new Date (2024,4,20),
      "personas": ["Ángel", "Jose", "María", "Ana"],
      "elementos": ["Entrada", "Traje"],
    },

    {
      "id": 2,
      "nombre": "Viaje Francia",
      "tipo": "Viaje",
      "imagen": "/assets/viaje.jpg",
      "asistencia": true,
      "fecha": new Date (2024,7,10),
      "personas": ["Ángel", "Jose", "María", "Ana"],
      "elementos": ["Billetes", "Pasaporte", "DNI"],
    },

  ];

  //constructor() { }
  constructor() { }
  /* Devolver lista a la llamada */
  getAllListaEventos() : ListaEventos[] {
    return this.observadorEventosLista;
  }
  getListaEventosById(id: Number): ListaEventos | undefined {
    let listaEventos= this.observadorEventosLista.find(listaEventos => listaEventos.id === id);
      return listaEventos;
  }

  submitApplication(introducirNombreEvento: string,  introducirNombre: string, introducirFecha: string, introducirObjetos: string){
    console.log(introducirNombreEvento, introducirNombre, introducirFecha, introducirObjetos);
  }

}
