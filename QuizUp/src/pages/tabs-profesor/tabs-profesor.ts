import { Component } from '@angular/core';

import { PerfilProfesorPage } from'../perfil-profesor/perfil-profesor';
import { CuestionariosPage } from './../cuestionarios/cuestionarios';

@Component({
  templateUrl: 'tabs-profesor.html',
})
export class TabsProfesorPage {

  tab1Root = PerfilProfesorPage;
  tab2Root = CuestionariosPage;

  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsProfesorPage');
  }

}
