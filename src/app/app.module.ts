import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CadastroPetsComponent } from './pages/cadastro-pets/cadastro-pets.component';
import { CpfFormatDirective } from './directives/cpf-format.directive';
import { PerfilClienteComponent } from './pages/perfil-cliente/perfil-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialog } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PerfilPetsComponent } from './pages/perfil-pets/perfil-pets.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroPetsComponent,
    PerfilPetsComponent,
    CpfFormatDirective,
    PerfilClienteComponent,
    ConfirmDialog,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
