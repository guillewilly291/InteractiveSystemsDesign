import { CuestionariosPage } from './../pages/cuestionarios/cuestionarios';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { EmpezarTestAlumnoPage } from '../pages/empezar-test-alumno/empezar-test-alumno';
import { HomePage } from '../pages/home/home';
import { TabsAlumnoPage } from '../pages/tabs-alumno/tabs-alumno';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LogInPage } from '../pages/log-in/log-in';

import { IonicPageModule } from 'ionic-angular';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2';
import { RegisterPage } from '../pages/register/register';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast/ngx';
import { TabsProfesorPage } from '../pages/tabs-profesor/tabs-profesor';
import { StartCuestionarioPage } from '../pages/start-cuestionario/start-cuestionario';
import { CreateCuestionariosPage } from '../pages/create-cuestionarios/create-cuestionarios';
import { PreguntasProvider } from '../providers/preguntas/preguntas';
import { CrearPreguntaPage } from '../pages/crear-pregunta/crear-pregunta';
import { ResponderQuizPage } from '../pages/responder-quiz/responder-quiz';
import { QuizStatsProvider } from '../providers/quiz-stats/quiz-stats';
import { PerfilAlumnoPage } from '../pages/perfil-alumno/perfil-alumno';
import { EditarPerfilAlumnoPage } from '../pages/editar-perfil-alumno/editar-perfil-alumno';
import { PerfilProfesorPage } from '../pages/perfil-profesor/perfil-profesor';
import { FlashCardComponent } from '../components/flash-card/flash-card';



export const firebaseConfig = {
  apiKey: "AIzaSyAO4jclR8Ze7ZR_UPbURBp768vFp0l7SUI",
  authDomain: "quizup-dsi.firebaseapp.com",
  databaseURL: "https://quizup-dsi.firebaseio.com",
  projectId: "quizup-dsi",
  storageBucket: "quizup-dsi.appspot.com",
  messagingSenderId: "31712275668"
};

@NgModule({
  declarations: [
    MyApp,
    EmpezarTestAlumnoPage,
    HomePage,
    TabsAlumnoPage,
    LogInPage,
    RegisterPage,
    TabsProfesorPage,
    CuestionariosPage,
    CreateCuestionariosPage,
    StartCuestionarioPage,
    CrearPreguntaPage,
    ResponderQuizPage,
    PerfilAlumnoPage,
    EditarPerfilAlumnoPage,
    PerfilProfesorPage,
    FlashCardComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicPageModule.forChild(HomePage),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EmpezarTestAlumnoPage,
    HomePage,
    TabsAlumnoPage,
    LogInPage,
    RegisterPage,
    TabsProfesorPage,
    CuestionariosPage, 
    CreateCuestionariosPage,
    StartCuestionarioPage,
    CrearPreguntaPage,
    ResponderQuizPage,
    PerfilAlumnoPage,
    EditarPerfilAlumnoPage,
    PerfilProfesorPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    Toast,
    PreguntasProvider,
    QuizStatsProvider
    
  ]
})
export class AppModule {
  constructor(){}
 }
