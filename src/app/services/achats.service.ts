import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../modele/film'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class AchatsService {
  private baseUrl = 'URL_DU_BACKEND'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  postAchat(panier: Film[], id : any ): Observable<any> {
    return this.http.post(`${this.baseUrl}/achats/${id}`, panier);
  }

  // Autres méthodes pour interagir avec le backend, par exemple :
  getAchat(id : any ): Observable<any> {
    return this.http.get(`${this.baseUrl}/achats/${id}`);
  } 
}
