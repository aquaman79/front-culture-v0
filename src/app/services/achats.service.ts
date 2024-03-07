import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../modele/film'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class AchatsService {
  private baseUrl = '/api/v1'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('access_token') || '' // Provide a fallback value
  });
 options = { headers: this.headers };
  postAchat(panier: Film[], id : any ): Observable<any> {
    return this.http.post(`${this.baseUrl}/transactions/${id}`, panier,this.options);
  }

  // Autres méthodes pour interagir avec le backend, par exemple :
  getAchat(id : any ): Observable<any> {
    return this.http.get(`${this.baseUrl}/transactions/${id}`,this.options);
  } 
}
