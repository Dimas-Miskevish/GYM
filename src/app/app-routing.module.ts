import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { TurnosComponent } from './turnos/turnos.component';



const routes: Routes = [
  
    { path: 'login', component: LoginComponent},
    { path: 'mi-cuenta', component: MiCuentaComponent, children: [
      { path: 'turnos', component: TurnosComponent }, 

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
