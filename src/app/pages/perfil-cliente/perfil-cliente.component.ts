import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialog } from 'src/app/components/dialog/dialog.component';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss']
})
export class PerfilClienteComponent implements OnInit {
  userName: string = 'teste'
  userId!: number;
  userDataForm!: FormGroup;
  
  userData = {
    id: 1,
    username: 'mirella.gabrielly.darocha@jmmarcenaria.com.br',
    name: 'Mirella Gabrielly da Rocha',
    documentNumber: '83747383408',
    createdAt: '2024-04-15T13:15:27.65681',
    updatedAt: '2024-04-15T13:15:27.65681'
  };

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService,    private dialog: MatDialog, private router: Router) { }
  ngOnInit(): void {
    this.createUserDataForm();
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      this.userId = +storedUserId; 
      this.loadUserData(this.userId);
    } else {
      this.createUserDataForm();
      console.log('Nenhum userId encontrado no sessionStorage.');
    }
    // this.loadUserData(this.userId);
  }

  createUserDataForm(){
    this.userDataForm = this.formBuilder.group({
      username: [{ value: this.userData.username, disabled: true }, Validators.required],
      name: [{ value: this.userData.name, disabled: true }, Validators.required],
      documentNumber: [{ value: this.userData.documentNumber, disabled: true }, Validators.required],
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

  openDeleteConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser();
      }
    });
  }

  deleteUser(): void {
    this.usuarioService.deleteUser(this.userId).subscribe({
      next: () => {
        console.log('Usuário excluído com sucesso.');
        // Aqui você pode adicionar lógica para redirecionar ou atualizar a vista
      },
      error: (error) => {
        console.error('Erro ao excluir o usuário', error);
      }
    });
  }

  redirect(route : string){
    this.router.navigate([route]);
  }

}
