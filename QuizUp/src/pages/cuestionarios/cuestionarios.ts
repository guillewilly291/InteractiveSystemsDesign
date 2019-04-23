import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CreateCuestionariosPage } from '../create-cuestionarios/create-cuestionarios';
import { StartCuestionarioPage } from '../start-cuestionario/start-cuestionario';

/**
 * Generated class for the CuestionariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cuestionarios',
  templateUrl: 'cuestionarios.html',
})
export class CuestionariosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {
  }
  


  crearPage() {
    this.navCtrl.push(CreateCuestionariosPage);
  }

  empezarPage() {
    this.navCtrl.push(StartCuestionarioPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuestionariosPage');
  }

  showInfo(){
    let alert = this.alertCtrl.create({
      title: 'Información de la página',
      subTitle: 'Esta página sirve para la creación y comienzo de tests en QuizUp para tus alumnos. Comienza la creación de tests mediante los siguientes botones',
      buttons: ['OK']
    });
    alert.present()
  }

}
