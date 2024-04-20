import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroPetsComponent } from './components/cadastro-pets/cadastro-pets.component';
import { CpfFormatDirective } from './directives/cpf-format.directive';
import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'cadastro-pet', component: CadastroPetsComponent},
  {path: 'perfil-cliente', component: PerfilClienteComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
