import { NgModule } from '@angular/core';
import { IonicPageModule, NavController } from 'ionic-angular';
import { CuestionariosPage } from './cuestionarios';
import { CreateCuestionariosPage } from '../create-cuestionarios/create-cuestionarios';
import { StartCuestionarioPage } from '../start-cuestionario/start-cuestionario';

@NgModule({
  declarations: [
    CuestionariosPage,
  ],
  imports: [
    IonicPageModule.forChild(CuestionariosPage),
  ],
})
export class CuestionariosPageModule {

 

}
