import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {RegisterPage} from '../register/register'
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
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
      public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }
  goToRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }
  login() {
    this.auth.loginUser(this.user.email, this.user.password).then((user) => {
      
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
