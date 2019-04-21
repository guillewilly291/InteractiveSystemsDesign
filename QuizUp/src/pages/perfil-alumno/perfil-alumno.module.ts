import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilAlumnoPage } from './perfil-alumno';

@NgModule({
  declarations: [
    PerfilAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilAlumnoPage),
  ],
})
export class PerfilAlumnoPageModule {}
