import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResponderQuizPage } from '../responder-quiz/responder-quiz';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
empezarQuiz(){
  this.navCtrl.push(ResponderQuizPage);
}
}
