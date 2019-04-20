import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregunta } from '../../models/Pregunta.model';

/*
  Generated class for the PreguntasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreguntasProvider {
  private cuestionario: Pregunta[]=[];
  constructor(public http: HttpClient) {
    console.log('Hello PreguntasProvider Provider');
  }
  addPregunta(value:Pregunta) {

    this.cuestionario.push(value);

  }

  getCuestionarios() {

    return this.cuestionario;
  }

  updateCuestionario(value) {


  }

  removeCuestionario() {
      this.cuestionario=[];

  }
}
