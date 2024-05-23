import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private baseUrl = 'http://localhost:8888/api/v1';

  constructor(private http: HttpClient) { }

  registerPet(petData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pets/register`, petData);
  }

  updatePet(petId: number, petData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/pets/${petId}`, petData);
  }

  getPetById(petId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pets/${petId}`);
  }

  deletePet(petId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pets/${petId}`);
  }

  listPets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pets/list`);
  }

  getUserAndPets(token: number,): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(`${this.baseUrl}/users/pets`, { headers });
  }
}
