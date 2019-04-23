import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pregunta } from '../../models/Pregunta.model';
import firebase from 'firebase';
import { EmpezarTestAlumnoPage } from '../empezar-test-alumno/empezar-test-alumno';

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
    intentos:number;
    aciertos:number;
    id:number;
    aprobados:number;
    picToView: string = "assets/images/tick.png";

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, public navParams: NavParams) {

    }

    ionViewDidLoad() {
      
      let tabs = document.querySelectorAll('.tabbar');
      if ( tabs !== null ) {
        Object.keys(tabs).map((key) => {
          console.log(tabs[ key ].style.display);
          tabs[ key ].style.display = 'none';
        });
      }

        this.slides.lockSwipes(true);

        /*
        this.db.database.ref('cuestionarios/').on("value", function (snapshot) {
          snapshot.forEach(function (item) {
            var itemVal = item.val();
            keys.push(itemVal);
            
          });
        
          console.log(snapshot.val());
        }, function (error) {
          console.log("Error: " + error.code);
        });*/
        
        setTimeout(() => {
            
            var quiz = this.navParams.data;
            this.questions = quiz.preguntas;
            this.propietario=quiz.propietario;
            this.tema=quiz.tema;
            this.titulo=quiz.nombre;
            this.totales=quiz.preguntas.length;
            this.intentos=quiz.totalIntentos;
            this.aciertos=quiz.aciertosTotales;
            this.id=quiz.id;
            this.aprobados=quiz.aprobados;
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
      if (question.correcta == answer) {
        this.score++;
        this.picToView = "assets/images/tick.png";
      } else {
        this.picToView = "assets/images/cross.png";
      }
        question.flashCardFlipped = true;

        

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
      var keys=[];
      var ID=this.id;
      this.db.database.ref('cuestionarios/').on("value", function (snapshot) {
        snapshot.forEach(function (item) {
          var itemVal = item.val();
          if(itemVal.id==ID){
            
            keys.push(item.key);
          }     
          
        });
      
        console.log(snapshot.val());
      }, function (error) {
        console.log("Error: " + error.code);
      });

      setTimeout(() => {
        if((this.score/this.totales)*10>=5){
          this.aprobados++;
        }
        var aciertosAct= this.aciertos+this.score;
        this.intentos++;
        let userRef = this.db.database.ref('cuestionarios/' + keys[0]);
        userRef.update({'aciertosTotales': aciertosAct})
        userRef.update({'aprobados': this.aprobados})
        userRef.update({'totalIntentos': this.intentos})
        var value = { aciertos: this.score, fecha: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear(), alumno: firebase.auth().currentUser.email, id: this.navParams.data.id,propietario:this.propietario,tema:this.tema, totales:this.questions.length,titulo:this.titulo};
        this.db.database.ref('quizStats/'+firebase.auth().currentUser.uid).push(value);
        //this.db.database.ref('quizStats/'+firebase.auth().currentUser.uid).set({aciertos:this.score, fecha:new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear(), propietario:this.propietario,tema:this.tema, totales:this.questions.length});
        //this.navCtrl.pop();
        this.navCtrl.setRoot(EmpezarTestAlumnoPage);
    }, 500);
      
    }
    redondeo(value){
      return Math.round(value * 100) / 10;
    }
  

  
}
