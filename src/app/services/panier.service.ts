import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../modele/film';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private baseUrl = 'URL_DU_BACKEND'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  postPanier(panier: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/panier`, panier);
  }

  // Autres méthodes pour interagir avec le backend, par exemple :
  getPanier(): Observable<any> {
    return this.http.get(`${this.baseUrl}/panier`);
  }

}
