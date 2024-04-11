import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8888/api/v1/users';
  private registerUrl = `${this.baseUrl}/register`;

  private loginUrl = `${this.baseUrl}/login`; 

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.registerUrl, userData, { headers });
  }

  loginUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.loginUrl, userData, { headers });
  }
}
