import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ResponderQuizPage } from '../responder-quiz/responder-quiz';

/**
 * Generated class for the EmpezarTestAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-empezar-test-alumno',
  templateUrl: 'empezar-test-alumno.html',
})
export class EmpezarTestAlumnoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpezarTestAlumnoPage');
  }

  empezarQuiz(){
    this.navCtrl.push(ResponderQuizPage);
  }

}
