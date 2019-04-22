import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Pregunta } from '../../models/Pregunta.model';
import firebase from 'firebase';
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
    questions: Pregunta[]=[];
    propietario:any;
    tema:any;
    titulo:any;
    totales:any;

    constructor(public navCtrl: NavController, private db: AngularFireDatabase) {

    }

    ionViewDidLoad() {
      debugger
      let tabs = document.querySelectorAll('.tabbar');
      if ( tabs !== null ) {
        Object.keys(tabs).map((key) => {
          console.log(tabs[ key ].style.display);
          tabs[ key ].style.display = 'none';
        });
      }

        var keys=[];
        this.slides.lockSwipes(true);

        this.db.database.ref('cuestionarios/').on("value", function (snapshot) {
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
            this.questions = keys[0].preguntas;
            this.propietario=keys[0].propietario;
            this.tema=keys[0].tema;
            this.titulo=keys[0].nombre;
            this.totales=keys[0].preguntas.length;
            //keys[0].preguntas = this.randomizeAnswers(originalOrder);
        }, 1000);

    }

    nextSlide(){
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }

    selectAnswer(answer, question){

        this.hasAnswered = true;
        //answer.selected = true;
        question.flashCardFlipped = true;

        if(question.correcta==answer){
            this.score++;
        }

        setTimeout(() => {
            this.hasAnswered = false;
            this.nextSlide();
            //answer.selected = false;
            question.flashCardFlipped = false;
        }, 1500);
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

    ionViewWillLeave() {
      let tabs = document.querySelectorAll('.tabbar');
      if ( tabs !== null ) {
        Object.keys(tabs).map((key) => {
          tabs[ key ].style.display = 'flex';
        });
      } // end if
    }

    finalizarQuiz(){
      var value= {aciertos:this.score, fecha:new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear(), propietario:this.propietario,tema:this.tema, totales:this.questions.length,titulo:this.titulo};
      this.db.database.ref('quizStats/'+firebase.auth().currentUser.uid).push(value);
      //this.db.database.ref('quizStats/'+firebase.auth().currentUser.uid).set({aciertos:this.score, fecha:new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear(), propietario:this.propietario,tema:this.tema, totales:this.questions.length});
      this.navCtrl.pop();
    }

  

  
}
