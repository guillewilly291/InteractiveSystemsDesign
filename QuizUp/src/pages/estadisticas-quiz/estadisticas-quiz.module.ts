import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstadisticasQuizPage } from './estadisticas-quiz';

@NgModule({
  declarations: [
    EstadisticasQuizPage,
  ],
  imports: [
    IonicPageModule.forChild(EstadisticasQuizPage),
  ],
})
export class EstadisticasQuizPageModule {}
