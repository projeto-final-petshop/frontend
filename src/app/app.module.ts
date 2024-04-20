import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CadastroPetsComponent } from './components/cadastro-pets/cadastro-pets.component';
import { CpfFormatDirective } from './directives/cpf-format.directive';
import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroPetsComponent,
    CpfFormatDirective,
    PerfilClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
