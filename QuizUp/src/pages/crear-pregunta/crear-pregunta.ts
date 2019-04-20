import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PreguntasProvider } from '../../providers/preguntas/preguntas';
import { Pregunta } from '../../models/Pregunta.model';

/**
 * Generated class for the CrearPreguntaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-pregunta',
  templateUrl: 'crear-pregunta.html',
})
export class CrearPreguntaPage {
  value: Pregunta = { titulo: null, opcion1: null, opcion2: null, opcion3: null, opcion4: null, correcta: null } 
  constructor(public navCtrl: NavController, public navParams: NavParams, private preguntaProvider:PreguntasProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPreguntaPage');
  }
onAddCuestionario( titulo, op1, op2, op3, op4, corr){
  debugger
    var value:Pregunta= { titulo: titulo, opcion1: op1, opcion2: op2, opcion3: op3, opcion4: op4 , correcta:parseInt(corr)} 
    this.preguntaProvider.addPregunta(value);
    this.navCtrl.pop();
  }
validar(titulo, op1, op2, op3, op4, corr){
  if (!titulo || !op1 || !op2 || !op3 || !op4 || !corr){
    return false;
  }else{
    return true;
  }
}
}
