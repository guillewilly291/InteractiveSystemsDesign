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
  toggle:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFireDatabase) {
  }

  ionViewWillEnter() {
    
    this.codigo= this.navParams.data.id;
    this.toggle=false;

    var keys=[];
    var ID=this.codigo;
    this.db.database.ref('cuestionarios/').on("value", function (snapshot) {
      snapshot.forEach(function (item) {
        var itemVal = item.val();
        if(itemVal.id==ID){
          
          keys.push(itemVal);
        }     
        
      });
    
      console.log(snapshot.val());
    }, function (error) {
      console.log("Error: " + error.code);
    });

    setTimeout(() => {
      this.toggle=keys[0].activado;
  }, 500);
    
  }

  activar(toggle){
    let userRef = this.db.database.ref('cuestionarios/' + firebase.auth().currentUser.uid + this.navParams.data.nombre);
    if(toggle==true){
      userRef.update({'activado': true})
    }else{
      userRef.update({'activado': false})
    }
  }

}
