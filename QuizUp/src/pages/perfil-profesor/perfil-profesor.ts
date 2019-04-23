import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { Cuestionario } from '../../models/cuestionario.model';
import { EditarPerfilProfesorPage } from '../editar-perfil-profesor/editar-perfil-profesor';
import { EstadisticasQuizPage } from '../estadisticas-quiz/estadisticas-quiz';

/**
 * Generated class for the PerfilProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-profesor',
  templateUrl: 'perfil-profesor.html',
})
export class PerfilProfesorPage {

  quizs: Cuestionario [] = [];

  userName: string="";
  userEmail: string ="";
  userKey: string ="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilProfesorPage');

    //this.getData();
    //this.getQuizs();
  }

  ionViewWillEnter(){
    this.getData();
    this.getQuizs();
  }


  getQuizs(){

    this.quizs = [];

    var email = this.db.database.app.auth().currentUser.email;
    
    var quizs=[];

    this.db.database.ref('cuestionarios').on("value", function(snapshot) {
      snapshot.forEach(function(item) {
          if( item.val().propietario == email ){
            quizs.push(item.val());
          }
    });
      console.log(snapshot.val());
   }, function (error) {
      console.log("Error: " + error.code);
   });

   setTimeout(() => {
    quizs.forEach(element => {
      this.quizs.push(element);
    });
     
   }, 200);
    
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

    this.navCtrl.push(EditarPerfilProfesorPage, params);
  }


  viewQuizStats(value: Cuestionario){
    this.navCtrl.push(EstadisticasQuizPage, value);
  }

  showInfo(){
    let alert = this.alertCtrl.create({
      title: 'Información de la página',
      subTitle: 'En esta página encontrarás tu información más relevante dentro de la aplicación, puedes observar los resultados de tus alumnos e incluso editar tus datos personales.',
      buttons: ['OK']
    });
    alert.present()
  }

}
