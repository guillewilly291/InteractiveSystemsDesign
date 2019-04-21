import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { PerfilAlumnoPage } from '../perfil-alumno/perfil-alumno';

/**
 * Generated class for the EditarPerfilAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil-alumno',
  templateUrl: 'editar-perfil-alumno.html',
})
export class EditarPerfilAlumnoPage {

  userKey: string=this.navParams.data[0];
  userName: string=this.navParams.data[1];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilAlumnoPage');
  }

  saveData(nombre: string){
    let userRef = this.db.database.ref('users/' + this.userKey);
      userRef.update({'nombre': nombre})

    //this.navCtrl.pop();
    
    this.navCtrl.push(PerfilAlumnoPage);
    this.navCtrl.remove(1);
    this.navCtrl.remove(1);
  }

}
