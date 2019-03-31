import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController, IonicPage } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { LogInPage } from '../pages/log-in/log-in';
import {HomePage} from '../pages/home/home'
import { AuthProvider } from '../providers/auth/auth';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { App } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LogInPage;

  constructor(public app: App,platform: Platform,public afAuth:AngularFireAuth,statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthProvider) {
    platform.ready().then(() => {
      //Las lineas de abajo permiten al iniciar la app comprobar si existe una sesion abierta
      //en tal caso, se mostraria la HomePage. y en caso contrario, la de LogIn
      this.auth.Session.subscribe(session => {
        if (session) {
          this.rootPage = TabsPage;
        }
        
      });
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          //User signed in
        } else {
          // No user is signed in.
        }
      });
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }
  public logout() {
    this.afAuth.auth.signOut().then(() => {
      this.app.getActiveNav().setRoot(LogInPage);
    })
  }
}
