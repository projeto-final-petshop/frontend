import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent {
  appointmentForm: FormGroup;
  endTime: string = '';

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      service: ['', Validators.required],
      startTime: ['', Validators.required],
      pet: ['', Validators.required]
    });

    this.appointmentForm.valueChanges.subscribe(() => {
      this.calculateEndTime();
    });
  }

  calculateEndTime() {
    const service = this.appointmentForm.get('service')?.value;
    const startTime = this.appointmentForm.get('startTime')?.value;
    if (service && startTime) {
      const start = new Date(`1970-01-01T${startTime}:00`);
      let end = new Date(start.getTime()); // Inicializa com o mesmo valor de start para evitar undefined

      if (service === 'banho') {
        end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour
      } else if (service === 'tosa') {
        end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour
      } else if (service === 'banho e tosa') {
        end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours
      } else if (service === 'veterinario') {
        end = new Date(start.getTime() + 30 * 60 * 1000); // 30 minutes, por exemplo
      }

      this.endTime = end.toTimeString().slice(0, 5);
    }
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const newAppointment = this.appointmentForm.value;
      newAppointment.endTime = this.endTime;
      console.log('New Appointment:', newAppointment);
      // Aqui você pode fazer uma chamada para o backend para salvar o novo agendamento
    }
  }
}
