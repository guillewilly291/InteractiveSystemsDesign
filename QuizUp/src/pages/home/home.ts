import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {

  }
  ionViewDidLoad(){
    var keys=[];
    var counts=[];
    var users= this.db.database.ref('users/').on("value", function(snapshot) {
      debugger
      snapshot.forEach(function(item) {
        var itemVal = item.val();
        keys.push(itemVal);
    });
    for (let i = 0; i < keys.length; i++) {
      debugger
      var hola=firebase.auth().currentUser.email;
      if(keys[i].id.toLocaleLowerCase()==firebase.auth().currentUser.email){
        alert("Hola"+ firebase.auth().currentUser.email);
      }
    
    }  
      console.log(snapshot.val());
   }, function (error) {
      console.log("Error: " + error.code);
   });
  }
}
