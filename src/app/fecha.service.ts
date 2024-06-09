import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})

export class FechaService {

  constructor (protected datePipe: DatePipe) {}

  transformDate(date: Date | undefined){
    if(date){
    return this.datePipe.transform(date, "dd-MM-yy");
    }
    else return null;
  }
}
