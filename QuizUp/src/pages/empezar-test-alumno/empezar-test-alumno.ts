import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ResponderQuizPage } from '../responder-quiz/responder-quiz';
import { AngularFireDatabase } from 'angularfire2/database';
import { Cuestionario } from '../../models/cuestionario.model';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

/**
 * Generated class for the EmpezarTestAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-empezar-test-alumno',
  templateUrl: 'empezar-test-alumno.html',
})
export class EmpezarTestAlumnoPage {
  nombre:string;
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public toastCtrl: ToastController, private barcodeScanner: BarcodeScanner) {
    this.encodeData = "https://www.FreakyJolly.com";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpezarTestAlumnoPage');
  }
  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
   encodedText() {
     debugger
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        encodedData => {
          console.log(encodedData);
          this.encodeData = encodedData;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
  }

  empezarQuiz(){
    var keys = [];
    var cuestionario: Cuestionario[];
    
    if(this.nombre!=undefined){
      this.nombre=this.nombre.replace(" ",'');
    }
    if(this.nombre!=""&&this.nombre!=undefined){

    
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
        if(keys[i].id==this.nombre){
          
          cuestionario = keys[i];
          //this.navCtrl.push(ResponderQuizPage, cuestionario);
          this.navCtrl.setRoot(ResponderQuizPage, cuestionario);
          break;
        }
        
      }
    }, 1000);
  }else{
      const toast = this.toastCtrl.create({
        message: 'Por favor, introduzca el código proporcionado por el profesor.',
        duration: 3000,
        position:"top"
      });

      toast.present();
  }
  }

}
