import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResponderQuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-responder-quiz',
  templateUrl: 'responder-quiz.html',
})
export class ResponderQuizPage {

  @ViewChild('slides') slides: any;

  hasAnswered: boolean = false;
  score: number = 0;

  slideOptions: any;
  questions: any;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) {

  }

  ionViewDidLoad() {
    var keys=[];
    this.slides.lockSwipes(true);

    var users = this.db.database.ref('cuestionarios/').on("value", function (snapshot) {
      snapshot.forEach(function (item) {
        var itemVal = item.val();
        keys.push(itemVal);
        debugger
      });
     
      console.log(snapshot.val());
    }, function (error) {
      console.log("Error: " + error.code);
    });
    setTimeout(() => {
      for (let i = 0; i < keys.length; i++) {
        let originalOrder = keys[0].preguntas;
        keys[0].preguntas = this.randomizeAnswers(originalOrder);

      }
    }, 1000);
  }

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  selectAnswer(answer, question) {

    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;

    if (answer.correct) {
      this.score++;
    }

    setTimeout(() => {
      this.hasAnswered = false;
      this.nextSlide();
      answer.selected = false;
      question.flashCardFlipped = false;
    }, 3000);
  }

  randomizeAnswers(rawAnswers: any[]): any[] {

    for (let i = rawAnswers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = rawAnswers[i];
      rawAnswers[i] = rawAnswers[j];
      rawAnswers[j] = temp;
    }

    return rawAnswers;

  }

  restartQuiz() {
    this.score = 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 1000);
    this.slides.lockSwipes(true);
  }
}
