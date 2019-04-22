import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Cuestionario } from '../../models/cuestionario.model';

/**
 * Generated class for the StartCuestionarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start-cuestionario',
  templateUrl: 'start-cuestionario.html',
})
export class StartCuestionarioPage {
  cuestionario: Cuestionario[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
   this.getDatos();


  }
  getDatos(){
    console.log('ionViewDidLoad StartCuestionarioPage');
    var keys = [];

    this.db.database.ref('cuestionarios/').on("value", function (snapshot) {
      snapshot.forEach(function (item) {
        var itemVal = item.val();
        keys.push(itemVal);

      });

      console.log(snapshot.val());
    }, function (error) {
      console.log("Error: " + error.code);
    });
    setTimeout(() => {
      for (let i = 0; i < keys.length; i++) {
        if(keys[i].propietario == firebase.auth().currentUser.email){
          this.cuestionario.push(keys[i]);
        }
      }
    }, 1000);
  }
 
}
