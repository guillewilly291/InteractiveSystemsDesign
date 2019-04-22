import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarPerfilProfesorPage } from './editar-perfil-profesor';

@NgModule({
  declarations: [
    EditarPerfilProfesorPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarPerfilProfesorPage),
  ],
})
export class EditarPerfilProfesorPageModule {}
