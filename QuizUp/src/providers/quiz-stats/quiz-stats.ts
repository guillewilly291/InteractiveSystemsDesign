import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the QuizStatsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuizStatsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello QuizStatsProvider Provider');
  }

}

export interface QuizStats {
  key?: string;//manejará el id cuando se utiliza firebase
  tema: string;
  fecha: string;
  aciertos: string;
  totales: string;
 }