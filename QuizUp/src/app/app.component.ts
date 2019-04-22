import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';
import { TabsAlumnoPage } from '../pages/tabs-alumno/tabs-alumno';
import { TabsProfesorPage } from '../pages/tabs-profesor/tabs-profesor'
import { LogInPage } from '../pages/log-in/log-in';
import { AuthProvider } from '../providers/auth/auth';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { App } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LogInPage;
  @ViewChild('nav')
  public navCtrl: NavController;
  constructor(public app: App, platform: Platform, public afAuth: AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthProvider, private toastCtrl: ToastController,private db:AngularFireDatabase) {
    platform.ready().then(() => {
      //Las lineas de abajo permiten al iniciar la app comprobar si existe una sesion abierta
      //en tal caso, se mostraria la HomePage. y en caso contrario, la de LogIn
      
      this.auth.Session.subscribe(session => {
        if (session) {
          var keys = [];
          var rol;

          this.db.database.ref('users/').on("value", function (snapshot) {
            snapshot.forEach(function (item) {
              var itemVal = item.val();
              keys.push(itemVal);
            });
            
            for (let i = 0; i < keys.length; i++) {
              if (keys[i].id.toLocaleLowerCase() == firebase.auth().currentUser.email) {
                rol = keys[i].rol;
                break;
              } else {
                rol = undefined;
              }

            }
            console.log(snapshot.val());
          }, function (error) {
            console.log("Error: " + error.code);
          });
          
          setTimeout(() => {
            if (rol == 'P') {
              this.rootPage = TabsProfesorPage;
            } else if (rol == 'A') {
              this.rootPage = TabsAlumnoPage;
            }
          }, 1000);
         
        }
        
      });
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          //alert(firebase.auth().currentUser.email);
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
      const toast = this.toastCtrl.create({
        message: 'Se ha cerrado sesión correctamente',
        duration: 3000,
        position:"top"
      });
      toast.present();
      this.app.getActiveNav().setRoot(LogInPage);
      this.rootPage= LogInPage;//ponemos como pagina inicial la de logIn
    })
  }
}
