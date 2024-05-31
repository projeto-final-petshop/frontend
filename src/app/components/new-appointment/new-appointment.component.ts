import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PetService } from 'src/app/services/pets.service';



@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  pets: any[] = [];
  endTime: string = '';

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private petService: PetService
  ) {
    this.appointmentForm = this.fb.group({
      petId: ['', Validators.required],
      serviceType: ['', Validators.required],
      petType: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required]
    });

    this.appointmentForm.valueChanges.subscribe(() => {
      this.calculateEndTime();
    });
  }

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {

    this.petService.getAllPets().subscribe(
      (pets: any[]) => {
        this.pets = pets;
      },
      (error: any) => {
        console.error('Error loading pets:', error);
      }
    );
  }

  calculateEndTime() {
    const serviceType = this.appointmentForm.get('serviceType')?.value;
    const appointmentTime = this.appointmentForm.get('appointmentTime')?.value;
    if (serviceType && appointmentTime) {
      const start = new Date(`1970-01-01T${appointmentTime}:00`);
      let end = new Date(start.getTime());

      switch (serviceType) {
        case 'BATH':
        case 'GROOMING':
          end = new Date(start.getTime() + 60 * 60 * 1000);
          break;
        case 'BATH_AND_GROOMING':
          end = new Date(start.getTime() + 2 * 60 * 60 * 1000); 
          break;
        case 'VETERINARY_CONSULTATION':
          end = new Date(start.getTime() + 30 * 60 * 1000); 
          break;
      }

      this.endTime = end.toTimeString().slice(0, 5);
    }
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const newAppointment = {
        ...this.appointmentForm.value,
        endTime: this.endTime
      };
      this.appointmentService.scheduleAppointment(newAppointment).subscribe(
        (response: any) => {
          console.log('New Appointment Created:', response);
        
        },
        (error: any) => {
          console.error('Error Creating Appointment:', error);
     
        }
      );
    }
  }
}
