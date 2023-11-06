import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NabvarComponent } from './nabvar/nabvar.component';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { HorariosComponent } from './horarios/horarios.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { TurnosComponent } from './turnos/turnos.component';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';





@NgModule({
  declarations: [
    AppComponent,
    NabvarComponent,
    InicioComponent,
    NosotrosComponent,
    EntrenamientoComponent,
    HorariosComponent,
    ContactoComponent,
    LoginComponent,
    MiCuentaComponent,
    TurnosComponent
  ],
  imports: [
     BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    
      // ...otros proveedores
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
