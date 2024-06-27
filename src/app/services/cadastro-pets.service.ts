import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroPetsService {

  private baseUrl = 'http://localhost:8888/api/v1/pets';
  private registerUrl = `${this.baseUrl}/create`;


  constructor(private http: HttpClient) { }


  registerPet(petData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.registerUrl, petData, { headers });
  }


}
