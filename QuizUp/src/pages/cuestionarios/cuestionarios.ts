import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
