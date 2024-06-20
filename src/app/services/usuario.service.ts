import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8888/api/v1/users';
  private registerUrl = `${this.baseUrl}/register`;
  private loginUrl = 'http://localhost:8888/api/v1/auth/login';
  private updatePasswordUrl = `${this.baseUrl}/update-password`;
  private resetPasswordUrl = 'http://localhost:8888/api/v1/auth/reset-password';
  private confirmResetPasswordUrl = 'http://localhost:8888/api/v1/auth/reset-password/confirm';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:8888/api/v1/auth/signup', userData, { headers });
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(this.loginUrl, userData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.baseUrl}/update`, userData, { headers });
  }

  getUserById(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete`);
  }

  updatePassword(passwordData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(this.updatePasswordUrl, passwordData, { headers });
  }

  resetPassword(emailData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.resetPasswordUrl, emailData, { headers });
  }

  confirmResetPassword(token: string, passwordData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.confirmResetPasswordUrl}?token=${token}`, passwordData, { headers });
  }
}
