import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  @Input() appointments: any[] = [];
  @Output() editAppointmentEvent = new EventEmitter<number>();
  currentWeekStart: Date = this.getStartOfWeek(new Date());

  constructor() {}

  ngOnInit() {
    this.currentWeekStart = this.getStartOfWeek(new Date());
    this.appointments = [
      {
        petId: 10,
        userId: 10,
        serviceType: "BATH_AND_GROOMING",
        petType: "DOG",
        appointmentDate: new Date(2024, 4, 29, 8, 0),
        appointmentTime: "10:00",
        status: "SCHEDULED",
        appointmentId: 10
      },
      {
        petId: 10,
        userId: 10,
        serviceType: "BATH_AND_GROOMING",
        petType: "DOG",
        appointmentDate: new Date(2024, 4, 28, 8, 0),
        appointmentTime: "10:00",
        status: "SCHEDULED",
        appointmentId: 11
      }
    ];
  }

  ngOnChanges() {
    console.log(this.appointments);
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajusta quando o dia é domingo
    return new Date(date.setDate(diff));
  }

  getDaysOfWeek(): Date[] {
    const days = [];
    const startOfWeek = new Date(this.currentWeekStart);
    for (let i = 0; i < 7; i++) {
      days.push(new Date(startOfWeek.setDate(startOfWeek.getDate() + (i === 0 ? 0 : 1))));
    }
    return days;
  }

  getAppointmentsForDay(day: Date): any[] {
    return this.appointments.filter(appointment =>
      new Date(appointment.appointmentDate).toDateString() === day.toDateString()
    );
  }

  previousWeek() {
    this.currentWeekStart = new Date(this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7));
  }

  nextWeek() {
    this.currentWeekStart = new Date(this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7));
  }

  editAppointment(appointmentId: number) {
    this.editAppointmentEvent.emit(appointmentId);
  }
}
