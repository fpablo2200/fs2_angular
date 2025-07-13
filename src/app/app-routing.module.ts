import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoriaComponent } from './categoria/categoria.component'
import { RecuperarComponent } from './recuperar/recuperar.component';
import { CarroComponent } from './carro/carro.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro/:email', component: RegisterComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'categoria/:nombre', component: CategoriaComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'carro', component: CarroComponent },
  { path: 'perfilusuario', component: UsuarioComponent },
  { path: 'perfiladmin', component: AdminComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
