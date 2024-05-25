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
  currentWeekStart: Date = this.getStartOfWeek(new Date());

  ngOnInit() {
    this.currentWeekStart = this.getStartOfWeek(new Date());
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

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
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

  getAppointmentsForDay(day: Date): Appointment[] {
    return this.appointments.filter(appointment =>
      appointment.start.toDateString() === day.toDateString()
    );
  }

  previousWeek() {
    this.currentWeekStart = new Date(this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7));
  }

  nextWeek() {
    this.currentWeekStart = new Date(this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7));
  }
}