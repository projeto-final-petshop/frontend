import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogErrorComponent } from 'src/app/components/dialog-error/dialog-error.component';
import { ConfirmDialog } from 'src/app/components/dialog/dialog.component';
import { PetService } from 'src/app/services/pets.service';
import { isHttpFailureResponse } from 'src/app/utils/error.validator';

@Component({
  selector: 'app-perfil-pet',
  templateUrl: './perfil-pets.component.html',
  styleUrls: ['./perfil-pets.component.scss']
})
export class PerfilPetsComponent implements OnInit {
  petDataForm!: FormGroup;
  pets: any[] = [];
  selectedPetIndex: number = 0;
  userId: any;

  constructor(private formBuilder: FormBuilder, private petService: PetService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    // this.createPetDataForm();
    // this.loadUserDataAndPets(1)
    const storedUserId = localStorage.getItem('token');

    // this.pets = ['1', '2']
    if (storedUserId) {
      this.userId = storedUserId;
      this.loadUserDataAndPets(1);
    } else {
      console.log('Nenhum userId encontrado no sessionStorage.');
    }
  }


  createPetDataForm() {
    this.petDataForm = this.formBuilder.group({
      name: ['', Validators.required],
      breed: ['', Validators.required],
      color: ['', Validators.required],
      animalType: ['', Validators.required],
      birthdate: ['', Validators.required],
      createdAt: [{value: '', disabled: true}],
      updatedAt: [{value: '', disabled: true}]
    });
  }

  loadUserDataAndPets(userId: number): void {

    // MOCK PARA PAGINA DE PERFIL PET COM DOIS PETS.
    // const mockData = {
    //   id: 1,
    //   name: "Mirella Gabrielly da Rocha",
    //   pets: [
    //     {
    //       id: 1,
    //       name: "Rex",
    //       breed: "Golden Retriever",
    //       color: "Golden",
    //       animalType: "Dog",
    //       birthdate: "31/12/2020",
    //       createdAt: "2024-04-15T13:15:39",
    //       updatedAt: "2024-04-15T13:15:39"
    //     },
    //     {
    //       id: 2,
    //       name: "Fluffy",
    //       breed: "Persian",
    //       color: "White",
    //       animalType: "Cat",
    //       birthdate: "01/01/2021",
    //       createdAt: "2024-04-15T13:20:00",
    //       updatedAt: "2024-04-15T13:20:00"
    //     }
    //   ]
    // }    
    // this.pets = mockData.pets;
    //   if (this.pets.length > 0) {
    //       this.selectedPetIndex = 0;
    //       this.populatePetDataForm(this.pets[this.selectedPetIndex]);
    //     }
    
    this.petService.getAllPets().subscribe({
      next: (data: any) => {
        console.log(data)
        this.pets = data || [];
        console.log(this.pets)
        if(this.pets){
          if (this.pets.length > 0) {
            this.selectedPetIndex = 0;
            this.populatePetDataForm(this.pets[this.selectedPetIndex]);
          }
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar os dados do usuário e pets', error);
        
        let requestErrorMessage = error.message;
        if (isHttpFailureResponse(error)) {
          requestErrorMessage = "Serviço fora do ar. Nossa equipe está trabalhando para voltar o quanto antes."
        }
        const dialogRef = this.dialog.open(DialogErrorComponent, {
          width: '250px',
          data: { message: requestErrorMessage }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // this.router.navigate(['/login']);
          }
        });

      }
    });
  }

  populatePetDataForm(pet: any): void {
    this.petDataForm = this.formBuilder.group({
      name: [pet.name, Validators.required],
      breed: [pet.breed, Validators.required],
      animalType: [pet.animalType, Validators.required],
      birthdate: [pet.birthdate, Validators.required]
    });
  }

  onSelectPet(index: number): void {
    this.selectedPetIndex = index;
    this.populatePetDataForm(this.pets[this.selectedPetIndex]);
  }

  updatePet(): void {
    if (this.petDataForm.valid) {
      this.petService.updatePet(this.pets[this.selectedPetIndex].id, this.petDataForm.getRawValue()).subscribe({
        next: (response: any) => {

          console.log('Pet atualizado com sucesso!', response);
          const dialogRef = this.dialog.open(ConfirmDialog, {
            width: '250px',
            data: { message: 'Pet atualizado com sucesso!' }
          });
          dialogRef.afterClosed().subscribe(() => {
            console.log('sucess')
          });
        },
        error: (error: any) => {
          console.error('Erro ao atualizar pet', error);

          let requestErrorMessage = error.message;
          if (isHttpFailureResponse(error)) {
            requestErrorMessage = "Serviço fora do ar. Nossa equipe está trabalhando para voltar o quanto antes."
          }
          const dialogRef = this.dialog.open(DialogErrorComponent, {
            width: '250px',
            data: { message: requestErrorMessage }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              // this.router.navigate(['/login']);
            }
          });

        }
      });
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  openDeleteConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: { message: "Você tem certeza que deseja excluir este pet?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePet();
      }
    });
  }

  deletePet(): void {
    this.petService.deletePet(this.pets[this.selectedPetIndex].id).subscribe({
      next: () => {
        console.log('Pet excluído com sucesso.');
        this.pets.splice(this.selectedPetIndex, 1);
        if (this.pets.length > 0) {
          this.onSelectPet(0); // Selecione o primeiro pet após excluir um
        } else {
          this.petDataForm.reset(); // Se não houver mais pets, limpe o formulário
        }
      },
      error: (error: any) => {
        console.error('Erro ao excluir o pet', error);
        let requestErrorMessage = error.message;
        if (isHttpFailureResponse(error)) {
          requestErrorMessage = "Serviço fora do ar. Nossa equipe está trabalhando para voltar o quanto antes."
        }
        const dialogRef = this.dialog.open(DialogErrorComponent, {
          width: '250px',
          data: { message: requestErrorMessage }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // this.router.navigate(['/login']);
          }
        });
      }
    });
  }

  toggleEdit(field: string): void {
    if (this.petDataForm.get(field)?.disabled) {
      this.petDataForm.get(field)?.enable();
    } else {
      this.petDataForm.get(field)?.disable();
    }
  }

  redirect(route : string){
    this.router.navigate([route]);
  }
}
