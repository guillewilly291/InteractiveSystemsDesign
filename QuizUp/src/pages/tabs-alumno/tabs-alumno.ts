import { Component } from '@angular/core';

import { EmpezarTestAlumnoPage } from '../empezar-test-alumno/empezar-test-alumno';
import { PerfilAlumnoPage } from '../perfil-alumno/perfil-alumno';

@Component({
  templateUrl: 'tabs-alumno.html',
})
export class TabsAlumnoPage {

  tab1Root = PerfilAlumnoPage;
  tab2Root = EmpezarTestAlumnoPage;

  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsAlumnoPage');
  }

}
