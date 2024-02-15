// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../modele/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = '/api/v1/'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(this.baseUrl + '/inscription', user);
  }

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/connexion`, credentials);
  }
}
