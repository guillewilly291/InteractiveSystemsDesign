import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCuestionariosPage } from './create-cuestionarios';

@NgModule({
  declarations: [
    CreateCuestionariosPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCuestionariosPage),
  ],
})
export class CreateCuestionariosPageModule {}
