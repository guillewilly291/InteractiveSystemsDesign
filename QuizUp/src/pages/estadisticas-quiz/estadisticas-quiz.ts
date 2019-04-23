import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cuestionario } from '../../models/cuestionario.model';

/**
 * Generated class for the EstadisticasQuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estadisticas-quiz',
  templateUrl: 'estadisticas-quiz.html',
})
export class EstadisticasQuizPage {

  quiz: Cuestionario;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.quiz = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadisticasQuizPage');
  }

  redondeo(value: number){
    return Math.round(value);
  }

}
