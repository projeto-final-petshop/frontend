import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8888/api/v1/users';
  private registerUrl = `${this.baseUrl}/register`;

  private loginUrl = `http://localhost:8888/api/v1/auth/login`;

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:8888/api/v1/auth/signup', userData, { headers });
  }

  loginUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.loginUrl, userData, { headers });
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.baseUrl}/${userId}`, userData, { headers });
  }

  getUserById(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userId}`
    });

    return this.http.get(`${this.baseUrl}/me`,  { headers });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }
}
