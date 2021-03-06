import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


import { AngularFireDatabase } from 'angularfire2/database';
import { QuizStats } from '../../providers/quiz-stats/quiz-stats';
import { Observable } from 'rxjs/Observable';
import { EditarPerfilAlumnoPage } from '../editar-perfil-alumno/editar-perfil-alumno';
import { QuizDetailAlumnoPage } from '../quiz-detail-alumno/quiz-detail-alumno';

/**
 * Generated class for the PerfilAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-alumno',
  templateUrl: 'perfil-alumno.html',
})
export class PerfilAlumnoPage {

  quizStats$: Observable<QuizStats[]>;

  userName: string="";
  userEmail: string ="";
  userKey: string ="";

  private contactsRef=this.db.list<QuizStats>('quizStats/'+this.db.database.app.auth().currentUser.uid);

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilAlumnoPage');

    this.quizStats$ = this.contactsRef.snapshotChanges().map(
      changes => {return changes.map(c=> ({key: c.payload.key, ...c.payload.val()}));
      });

    

    this.getData();

  }

  getData(){

    var email = this.db.database.app.auth().currentUser.email;

    var userEmail="";
    var userKey="";
    var userName="";

    

    this.db.database.ref('users').on("value", function(snapshot) {
      
      snapshot.forEach(function(item) {
          if( item.val().id == email ){
            userKey = item.key;
            userEmail = item.val().id;
            userName = item.val().nombre;
          }
    });
      console.log(snapshot.val());
   }, function (error) {
      console.log("Error: " + error.code);
   });

   /*setTimeout(() => {
    this.userEmail = userItem.id;
    this.userName = userItem.nombre;
    this.userKey = userKey;
    console.log(userKey);
     
   }, 1000);*/
   
    
    this.userName = userName;
    this.userKey = userKey;
    this.userEmail = userEmail;
    
  }


  editData(){
    var params = [];

    params.push(this.userKey);
    params.push(this.userName);

    this.navCtrl.push(EditarPerfilAlumnoPage, params);
  }

  redondeo(value: number){
    return Math.round(value);
  }

  viewQuizDetail(value: QuizStats){

    this.navCtrl.push(QuizDetailAlumnoPage, value);

  }

  showInfo(){
    let alert = this.alertCtrl.create({
      title: 'Información de la página',
      subTitle: 'En esta página encontrarás tu información más relevante dentro de la aplicación, puedes observar los resultados de tus últimos tests e incluso editar tus datos personales.',
      buttons: ['OK']
    });
    alert.present()
  }

}
