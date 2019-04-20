import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ThrowStmt } from '@angular/compiler';
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
  nombre;
  constructor(public navCtrl: NavController, public navParams: NavParams, private preguntaProvider: PreguntasProvider, public db:AngularFireDatabase, public toastCtrl: ToastController) {
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
  hayPreguntas(){
    debugger
    if(this.cuestionario.length==0){
      return false;
    }else{
      return true;
    }
  }

  guardarCuestionario(nombre, cuest){
    debugger
    this.db.database.ref('cuestionarios/' + firebase.auth().currentUser.uid+nombre).set({ propietario:firebase.auth().currentUser.email,nombre: nombre, preguntas: cuest, fechaCreacion: new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear()});
    const toast = this.toastCtrl.create({
      message: 'El cuestionario se ha guardado correctamente',
      duration: 3000
    });
    toast.present();
    this.preguntaProvider.removeCuestionario();
    this.navCtrl.pop();
  }

}
