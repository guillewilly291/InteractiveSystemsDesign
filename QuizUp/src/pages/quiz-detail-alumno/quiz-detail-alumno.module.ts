import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizDetailAlumnoPage } from './quiz-detail-alumno';

@NgModule({
  declarations: [
    QuizDetailAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizDetailAlumnoPage),
  ],
})
export class QuizDetailAlumnoPageModule {}
