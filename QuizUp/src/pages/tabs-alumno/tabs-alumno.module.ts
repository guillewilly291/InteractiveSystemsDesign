import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsAlumnoPage } from './tabs-alumno';

@NgModule({
  declarations: [
    TabsAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsAlumnoPage),
  ],
})
export class TabsAlumnoPageModule {}
