import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { PerfilProfesorPage } from '../perfil-profesor/perfil-profesor';

/**
 * Generated class for the EditarPerfilProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil-profesor',
  templateUrl: 'editar-perfil-profesor.html',
})
export class EditarPerfilProfesorPage {

  userKey: string=this.navParams.data[0];
  userName: string=this.navParams.data[1];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilProfesorPage');
  }

  saveData(nombre: string){
    let userRef = this.db.database.ref('users/' + this.userKey);
      userRef.update({'nombre': nombre})

    this.navCtrl.remove(1);
    this.navCtrl.setRoot(PerfilProfesorPage);
    
  }

}
