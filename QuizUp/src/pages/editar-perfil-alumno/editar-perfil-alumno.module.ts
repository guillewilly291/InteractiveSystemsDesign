import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarPerfilAlumnoPage } from './editar-perfil-alumno';

@NgModule({
  declarations: [
    EditarPerfilAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarPerfilAlumnoPage),
  ],
})
export class EditarPerfilAlumnoPageModule {}
