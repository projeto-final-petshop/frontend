import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {
  activeItem: number = 0;
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    //   this.appointments = [
    //   {
    //     petId: 10,
    //     userId: 10,
    //     serviceType: "BATH_AND_GROOMING",
    //     petType: "DOG",
    //     appointmentDate:  new Date(2024, 4, 29, 8, 0),
    //     appointmentTime: "10:00",
    //     status: "SCHEDULED",
    //     appointmentId: 10
    //   },
    //   {
    //     petId: 10,
    //     userId: 10,
    //     serviceType: "BATH_AND_GROOMING",
    //     petType: "DOG",
    //     appointmentDate:  new Date(2024, 4, 28, 8, 0),
    //     appointmentTime: "10:00",
    //     status: "SCHEDULED",
    //     appointmentId: 10
    //   }
    // ];

    this.appointmentService.getAppointments().subscribe(
      (data: any[]) => {
        console.log(data)
        this.appointments = data;
      },
      (error: any) => {
        console.error('Erro ao carregar agendamentos', error);
      }
    );
  }

  setActive(index: number) {
    this.activeItem = index;
  }
}
