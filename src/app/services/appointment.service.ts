import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8888/api/v1/appointments'; // URL base da API
  private adminApiUrl = 'http://localhost:8888/api/v1/admins/appointments'; // URL base para administradores

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getAppointmentById(appointmentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${appointmentId}`);
  }

  getAppointmentsByPet(petId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pets/${petId}`);
  }

  scheduleAppointment(appointmentRequest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/schedule`, appointmentRequest);
  }

  updateAppointment(appointmentId: number, appointmentRequest: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${appointmentId}`, appointmentRequest);
  }

  cancelAppointment(appointmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cancel/${appointmentId}`);
  }

  getAdminAppointments(): Observable<any> {
    return this.http.get<any>(`${this.adminApiUrl}/all`);
  }
}
