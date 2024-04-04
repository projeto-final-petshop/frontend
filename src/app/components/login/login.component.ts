import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cadastroForm: FormGroup;

  constructor(private usuarioService: UsuarioService) { 
    this.cadastroForm = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }


  cadastrar() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value)
      this.usuarioService.registerUser(this.cadastroForm.value).subscribe({
        next: (response) => console.log('Usuário cadastrado com sucesso!', response),
        error: (error) => console.error('Erro ao cadastrar usuário', error)
      });
    }
  }
}
