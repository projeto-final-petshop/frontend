import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cadastroForm: FormGroup;
  loginForm: FormGroup;
  isForgetPassword!: boolean;
  errorMessage: string | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router,  private dialog: MatDialog,) {
    this.cadastroForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', [Validators.required, this.passwordStrengthValidator()]),
      cpf: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void { }

  cadastrar() {
    if (this.cadastroForm.valid) {
      this.usuarioService.registerUser(this.cadastroForm.value).subscribe({
        next: (response) => {
          this.errorMessage = null;
          this.cadastroForm.reset();
          console.log('Usuário cadastrado com sucesso!', response);
          localStorage.setItem('userId', response.token);
          localStorage.setItem('token', response.token);

          const dialogRef = this.dialog.open(ConfirmDialog, {
            width: '250px',
            data: { message: "Usuario cadastrado! Ralize seu login" }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.router.navigate(['/login']);
            }
          });
          
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuário', error);
          this.errorMessage = 'Erro ao cadastrar usuário. Por favor, tente novamente.';
        }
      });
    }
  }

  login() {
    if (this.loginForm.valid) {
      const userData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.usuarioService.loginUser(userData).subscribe({
        next: (response) => {
          if (response.token) {
            this.errorMessage = null;
            localStorage.setItem('userId', response.token);
            localStorage.setItem('token', response.token);
            
            const roles = response.roles;
            if (roles.includes('ROLE_ADMIN')) {
              localStorage.setItem('permission', 'ADMIN');
            }else{
              localStorage.setItem('permission', 'USER');
            }
            this.router.navigate(['/painel']);
          }
          console.log('Login realizado com sucesso!', response);
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuário', error);
          this.errorMessage = 'Erro ao realizar login. Por favor, tente novamente.'; 
        }
        
      });
    }
  }

  emailDomainValidator(domainName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      const domain = email.substring(email.lastIndexOf("@") + 1);
      if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
        return null;
      }
      return { 'emailDomain': true };
    };
  }

  esqueciSenha(isForgetPassword: boolean) {
    this.isForgetPassword = isForgetPassword;
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecial = /[\W_]+/.test(value);
      const isValidLength = value.length >= 8;
      if (hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && isValidLength) {
        return null;
      }
      return {
        passwordStrength: 'Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.'
      };
    };
  }
}
