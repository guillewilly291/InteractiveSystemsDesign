import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { CrearPreguntaPage } from '../crear-pregunta/crear-pregunta';
import { Pregunta } from '../../models/Pregunta.model';
import { PreguntasProvider } from '../../providers/preguntas/preguntas';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the CreateCuestionariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-cuestionarios',
  templateUrl: 'create-cuestionarios.html',
})
export class CreateCuestionariosPage {
  cuestionario: Pregunta[]=[];
  nombre:string;
  tema:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private preguntaProvider: PreguntasProvider, public db:AngularFireDatabase, public toastCtrl: ToastController, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCuestionariosPage');
  }
  ionViewWillEnter(){
    this.cuestionario = this.preguntaProvider.getCuestionarios();
  }

  goToCrearPregunta(){
    this.navCtrl.push(CrearPreguntaPage)
  }
  hayPreguntas(nombre,tema){
    if(this.cuestionario.length==0||nombre==undefined||tema==undefined){
      return false;
    }else{
      return true;
    }
  }

  guardarCuestionario(nombre,tema, cuest){
    
    var contador=0;
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
      
      var max=0;
      
      for (let i = 0; i < keys.length; i++) {
         max=Math.max(keys[i].id,max);
        
      }
      contador= max +4;
      
    
    this.db.database.ref('cuestionarios/' + firebase.auth().currentUser.uid+nombre).set({ aprobados:0,totalIntentos:0, aciertosTotales:0, propietario:firebase.auth().currentUser.email,id: contador,nombre: nombre, preguntas: cuest, fechaCreacion: new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear(),tema:tema, activado:false});
    }, 2000);
    const toast = this.toastCtrl.create({
      message: 'El cuestionario se ha guardado correctamente',
      duration: 3000
    });
    
    toast.present();
    this.preguntaProvider.removeCuestionario();
    this.navCtrl.pop();
  }

  showInfo(){
    let alert = this.alertCtrl.create({
      title: 'Información de la página',
      subTitle: 'Esta página sirve para la creación de un cuestionario, rellena el nombre y el tema del mismo. Prueba a crear unas preguntas para el test.',
      buttons: ['OK']
    });
    alert.present()
  }

}
