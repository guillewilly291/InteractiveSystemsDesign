import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

/**
 * Generated class for the CodigoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-codigo',
  templateUrl: 'codigo.html',
})
export class CodigoPage {
  codigo:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFireDatabase) {
  }

  ionViewDidLoad() {
    
    this.codigo= this.navParams.data.id;
    
  }

  activar(toggle){
    let userRef = this.db.database.ref('cuestionarios/' + firebase.auth().currentUser.uid + this.navParams.data.nombre);
    if(toggle==true){
      debugger
      userRef.update({'activado': true})
    }else{
      userRef.update({'activado': false})
    }
  }

}
