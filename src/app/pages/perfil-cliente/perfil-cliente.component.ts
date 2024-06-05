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
  userId!: any;
  userDataForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private router: Router) { }
  ngOnInit(): void {
    this.createUserDataForm();
    const storedUserId = localStorage.getItem('token');
    if (storedUserId) {
      this.userId = storedUserId;

      this.loadUserData(this.userId);
    } else {
      console.log('Nenhum userId encontrado no sessionStorage.');
    }
    // this.loadUserData(this.userId);
  }

  createUserDataForm(){
    this.userDataForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }, Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      cpf: [{ value: '', disabled: true }, Validators.required],
      phoneNumber: [{ value: '', disabled: true }, Validators.required],
      password: [{ value: '', disabled: false }, Validators.required],
      confirmPassword: [{ value: '', disabled: false }, Validators.required]
    });
  }

  loadUserData(userId: any): void {
    this.usuarioService.getUserById().subscribe({
      next: (userData) => {
        console.log(userData)
        this.userName = userData.username;
        this.userDataForm = this.formBuilder.group({
          email: [{ value: userData.email, disabled: true }, Validators.required],
          name: [{ value: userData.name, disabled: true }, Validators.required],
          cpf: [{ value: userData.cpf, disabled: true }, Validators.required],
          phoneNumber: [{ value: userData.phoneNumber, disabled: true }, Validators.required],
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
      width: '250px',
      data: { message: "Você tem certeza que deseja excluir esta conta?" }
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
        this.clearLocalStorage();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao excluir o usuário', error);
      }
    });
  }

  clearLocalStorage(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

  redirect(route : string){
    this.router.navigate([route]);
  }

}
