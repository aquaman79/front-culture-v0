import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../modele/film';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private baseUrl = '/api/v1/'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('access_token') || '' // Provide a fallback value
  });
 options = { headers: this.headers };
  postPanier(panier: any, id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/paniers/${id}`, panier,this.options);
  }
  

  // Autres méthodes pour interagir avec le backend, par exemple :
  getPanier(id : any ): Observable<any> {
    return this.http.get(`${this.baseUrl}/paniers/${id}`,this.options);
  }

}
