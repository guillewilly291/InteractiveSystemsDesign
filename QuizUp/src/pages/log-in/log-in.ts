import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {RegisterPage} from '../register/register'
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from 'firebase/app';
/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {
  user = { email: '', password: '' };
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public db:AngularFireDatabase,
      public auth:AuthProvider,
      public alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }
  goToRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }
  login() {
    var usuario;
    this.auth.loginUser(this.user.email, this.user.password).then((user) => {
      var keys = [];
      
      this.db.database.ref('users/').on("value", function (snapshot) {
          snapshot.forEach(function (item) {
          var itemVal = item.val();
          keys.push(itemVal);
        });
        
        for (let i = 0; i < keys.length; i++) {          
          if (keys[i].id.toLocaleLowerCase() == firebase.auth().currentUser.email) {
            usuario = keys[i].nombre;
            break;
          }else{
            usuario=undefined;
          }

        }
        console.log(snapshot.val());
      }, function (error) {
        console.log("Error: " + error.code);
      });
      
      if(usuario!=undefined){
        const toast = this.toastCtrl.create({
          message: 'Hola, '+usuario,
          duration: 3000,
          position: "top"
        });
        toast.present();
      }

    }
    )
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })
  }}
