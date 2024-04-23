import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss']
})
export class PerfilClienteComponent implements OnInit {
  userName: string = 'teste'
  userId: number = 1
  userDataForm!: FormGroup;
  
  userData = {
    id: 1,
    username: 'mirella.gabrielly.darocha@jmmarcenaria.com.br',
    name: 'Mirella Gabrielly da Rocha',
    documentNumber: '83747383408',
    createdAt: '2024-04-15T13:15:27.65681',
    updatedAt: '2024-04-15T13:15:27.65681'
  };

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }
  ngOnInit(): void {
    this.createUserDataForm();
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      this.userId = +storedUserId; 
      this.loadUserData(this.userId);
    } else {
      console.log('Nenhum userId encontrado no sessionStorage.');
    }
    this.loadUserData(this.userId);
  }

  createUserDataForm(){
    this.userDataForm = this.formBuilder.group({
      username: [{ value: '', disabled: true }, Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      documentNumber: [{ value: '', disabled: true }, Validators.required],
      password: [{ value: '', disabled: false }, Validators.required],
      confirmPassword: [{ value: '', disabled: false }, Validators.required]
    });
  }

  loadUserData(userId: number): void {
    this.usuarioService.getUserById(userId).subscribe({
      next: (userData) => {
        this.userName = userData.username;
        this.userDataForm = this.formBuilder.group({
          username: [{ value: userData.username, disabled: true }, Validators.required],
          name: [{ value: userData.name, disabled: true }, Validators.required],
          documentNumber: [{ value: userData.documentNumber, disabled: true }, Validators.required],
          password: [{ value: '', disabled: false }, Validators.required],
          confirmPassword: [{ value: '', disabled: false }, Validators.required]
        });
      },
      error: (error) => {
        console.error('Erro ao carregar os dados do usuário', error);
      }
    });
  }

  updateUser(): void {
    if (this.userDataForm.valid) {
      this.usuarioService.updateUser(this.userId, this.userDataForm.getRawValue()).subscribe({
        next: (response) => {
          console.log('Usuário atualizado com sucesso', response);
        },
        error: (error) => {
          console.error('Erro ao atualizar usuário', error);
        }
      });
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  toggleEdit(field: string): void {
    if (this.userDataForm.get(field)?.disabled) {
      this.userDataForm.get(field)?.enable();
    } else {
      this.userDataForm.get(field)?.disable();
    }
  }

}
