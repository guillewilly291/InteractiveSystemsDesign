import { CuestionariosPage } from './../cuestionarios/cuestionarios';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { IonicPage } from 'ionic-angular';

@Component({
  templateUrl: 'tabs2.html'
})
export class TabsPage2 {

  tab1Root = HomePage;
  tab2Root = CuestionariosPage;
  

  constructor() {

  }
}
