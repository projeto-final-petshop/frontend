import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroPetsService } from 'src/app/services/cadastro-pets.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-pets',
  templateUrl: './cadastro-pets.component.html',
  styleUrls: ['./cadastro-pets.component.scss']
})
export class CadastroPetsComponent implements OnInit {

  cadastroPetsForm: FormGroup;
  userId!: Number;

  constructor(private cadastroPetsService: CadastroPetsService) {
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
    const userId = sessionStorage.getItem('userId');
    this.userId = userId ? Number(userId) : 0;
  }
  

  cadastrar() {
    if (this.cadastroPetsForm.valid) {
      const formValues = { ...this.cadastroPetsForm.value, userId: this.userId };
  
      this.cadastroPetsService.registerPet(formValues).subscribe({
        next: (response) => {
          console.log('Pet cadastrado com sucesso', response);
        },
        error: (error) => {
          console.error('Erro ao cadastrar pet', error);
        }
      });
    } else {
      console.error('Formulário inválido');
    }
  }
  
}
