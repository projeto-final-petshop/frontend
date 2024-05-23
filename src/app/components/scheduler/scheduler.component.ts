import { Component, OnInit } from '@angular/core';

interface Appointment {
  id: number;
  title: string;
  start: Date;
  end: Date;
  participants: string[];
}


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {


  appointments: Appointment[] = [];

  ngOnInit() {
    this.appointments = [
      {
        id: 1,
        title: 'Banho',
        start: new Date(2024, 4, 20, 8, 0),
        end: new Date(2024, 4, 20, 9, 0),
        participants: ['user']
      },
      {
        id: 2,
        title: 'Banho e tosa',
        start: new Date(2024, 4, 21, 15, 0),
        end: new Date(2024, 4, 21, 16, 0),
        participants: ['user']
      }
    ];
  }

  getDaysOfWeek(): Date[] {
    const days = [];
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay() + 1; 
    for (let i = 0; i < 7; i++) {
      days.push(new Date(today.setDate(startOfWeek + i)));
    }
    return days;
  }

  getAppointmentsForDay(day: Date): Appointment[] {
    return this.appointments.filter(appointment =>
      appointment.start.toDateString() === day.toDateString()
    );
  }
}