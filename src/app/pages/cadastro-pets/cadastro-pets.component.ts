import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroPetsService } from 'src/app/services/cadastro-pets.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-pets',
  templateUrl: './cadastro-pets.component.html',
  styleUrls: ['./cadastro-pets.component.scss']
})
export class CadastroPetsComponent implements OnInit {

  cadastroPetsForm: FormGroup;
  token: any;

  constructor(private cadastroPetsService: CadastroPetsService, private router: Router) {
    this.cadastroPetsForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl('', [ Validators.min(0)]),
      color: new FormControl('',),
      breed: new FormControl(''),
      animalType: new FormControl(''),
      birthdate: new FormControl(''),
    });
  }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      this.token = token
    }
  }
  

  cadastrar() {
    if (this.cadastroPetsForm.valid) {
      const formValues = { ...this.cadastroPetsForm.value };
  
      this.cadastroPetsService.registerPet(formValues).subscribe({
        next: (response) => {
          console.log('Pet cadastrado com sucesso', response);
          this.redirect('pets')
        },
        error: (error) => {
          console.error('Erro ao cadastrar pet', error);
        }
      });
    } else {
      console.error('Formulário inválido');
    }
  }
  
  redirect(route : string){
    this.router.navigate([route]);
  }

}
