import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { isAdmin } from '@firebase/util';
import { Toast } from '@ionic-native/toast/ngx';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = { email: null, password:null, rol: null }
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public db: AngularFireDatabase,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
     ) {
    
  }
  
   addUserToDataBase(email, password) {
     this.auth.registerUser(email, password)
       .then((user) => {
         this.db.database.ref(`users/${Date.now()}`).set({id:email});
         const toast = this.toastCtrl.create({
           message: 'User was added successfully',
           duration: 3000
         });
         toast.present();
         this.navCtrl.push(HomePage);
       })
       .catch(err => {
         let alert = this.alertCtrl.create({
           title: 'Error',
           subTitle: err.message,
           buttons: ['Aceptar']
         });
         alert.present();
       })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}