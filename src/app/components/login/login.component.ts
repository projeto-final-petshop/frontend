import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cadastroForm: FormGroup;
  loginForm: FormGroup;

  constructor(private usuarioService: UsuarioService, private router: Router) { 
    this.cadastroForm = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required])
    });
    this.loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }


  cadastrar() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value)
      this.usuarioService.registerUser(this.cadastroForm.value).subscribe({
        next: (response) => {
          console.log('Usuário cadastrado com sucesso!', response)
        },
        error: (error) => console.error('Erro ao cadastrar usuário', error)
      });
    }
  }

  login() {
    if (this.loginForm.valid) {
      const userData = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.senha
      };
      this.usuarioService.loginUser(userData).subscribe({
        next: (response) => {
          sessionStorage.setItem('userId', response.userId);
          this.router.navigate(['/cadastro-pet']);
          console.log('Login realizado com sucesso!', response);
        },
        error: (error) => console.error('Erro ao realizar login', error)
      });
    }
  }

  esqueciSenha(){
    
  }
}
