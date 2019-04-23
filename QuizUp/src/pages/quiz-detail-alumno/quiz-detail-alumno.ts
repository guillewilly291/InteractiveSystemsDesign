import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { QuizStats } from '../../providers/quiz-stats/quiz-stats';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the QuizDetailAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quiz-detail-alumno',
  templateUrl: 'quiz-detail-alumno.html',
})
export class QuizDetailAlumnoPage {

  quizStats: QuizStats;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private toastCtrl: ToastController) {
    this.quizStats = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizDetailAlumnoPage');
  }

  redondeo(value: number){
    return Math.round(value);
  }

  eliminarQuiz(){
    let quizRef = this.db.database.ref('quizStats/'+ this.db.database.app.auth().currentUser.uid + "/" + this.quizStats.key);
    quizRef.remove()

    this.navCtrl.pop();

    const toast = this.toastCtrl.create({
      message: "Eliminado correctamente",
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

}
