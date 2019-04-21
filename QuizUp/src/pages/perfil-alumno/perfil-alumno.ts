import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { AngularFireDatabase } from 'angularfire2/database';
import { QuizStats } from '../../providers/quiz-stats/quiz-stats';
import { Observable } from 'rxjs/Observable';
import { EditarPerfilAlumnoPage } from '../editar-perfil-alumno/editar-perfil-alumno';

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

  private contactsRef=this.db.list<QuizStats>('quizStats/tontako');//this.navParams.data

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilAlumnoPage');

    this.quizStats$ = this.contactsRef.snapshotChanges().map(
      changes => {return changes.map(c=> ({key: c.payload.key, ...c.payload.val()}));
      });

    this.getData();

  }

  getData(){

    var email = this.db.database.app.auth().currentUser.email;;

    var userItem;
    var userKey;

    debugger

    var users= this.db.database.ref('users').on("value", function(snapshot) {
      debugger
      snapshot.forEach(function(item) {
          if( item.val().id == email ){
            userKey = item.key;
            userItem = item.val();
          }
    });
      console.log(snapshot.val());
   }, function (error) {
      console.log("Error: " + error.code);
   });

   setTimeout(() => {
    this.userEmail = userItem.id;
    this.userName = userItem.nombre;
    this.userKey = userKey;
    console.log(userKey);
     
   }, 1000);
    
  }

  /*loadQuizStats(){

    var user = "nombreUser";

    var keys=[];

    debugger

    var users= this.db.database.ref('quizStats/nombreUser/').on("value", function(snapshot) {
      debugger
      snapshot.forEach(function(item) {
        var itemVal = item.val();
        keys.push(itemVal);
    });
    debugger
    for (let i = 0; i < keys.length; i++) {
      debugger
      var data = keys[i].split(";");
      
      var quizModel: quizStats;
      quizModel.tema = data[0];
      quizModel.fecha = data[1];
      quizModel.aciertos = data[2];
      quizModel.totales = data[3];
      debugger
      quizModel.tema = data[0];

      var quizModel: quizStats = {quiz:"", tema:"data[0]", fecha:"data[1]", aciertos:"data[2]", totales:"data[3]"};
      this.pushData(quizModel);
      //this.quizStats.push(quizModel);
    
    }
      console.log(snapshot.val());
   }, function (error) {
      console.log("Error: " + error.code);
   });

   debugger

  }

  pushData(value: quizStats){
    debugger
    this.quizStats.push(value);
  }*/

  hola(){
    debugger

    this.quizStats$.forEach(element => {
      console.log("holasdasfs");
      element.pop();
  });

    this.quizStats$.subscribe(
      competitors => {
          competitors.map(competitor =>
              console.log(competitor)
          )
      });

    for(var i = 0; i< 10; i++){
      var a= this.quizStats$[0];
      a = 0;
    }
  }

  editData(){
    var params = [];

    params.push(this.userKey);
    params.push(this.userName);

    //this.userName = "feo";

    this.navCtrl.push(EditarPerfilAlumnoPage, params);
  }

  redondeo(value: number){
    return Math.round(value);
  }

}
