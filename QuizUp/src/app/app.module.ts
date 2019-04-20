import { CuestionariosPage } from './../pages/cuestionarios/cuestionarios';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

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
import { TabsPage2 } from '../pages/tabs2/tabs2';
import { StartCuestionarioPage } from '../pages/start-cuestionario/start-cuestionario';
import { CreateCuestionariosPage } from '../pages/create-cuestionarios/create-cuestionarios';
import { PreguntasProvider } from '../providers/preguntas/preguntas';
import { CrearPreguntaPage } from '../pages/crear-pregunta/crear-pregunta';
import { ResponderQuizPage } from '../pages/responder-quiz/responder-quiz';



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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LogInPage,
    RegisterPage,
    TabsPage2,
    CuestionariosPage,
    CreateCuestionariosPage,
    StartCuestionarioPage,
    CrearPreguntaPage,
    ResponderQuizPage
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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LogInPage,
    RegisterPage,
    TabsPage2,
    CuestionariosPage, 
    CreateCuestionariosPage,
    StartCuestionarioPage,
    CrearPreguntaPage,
    ResponderQuizPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    Toast,
    PreguntasProvider
    
  ]
})
export class AppModule {
  constructor(){}
 }
