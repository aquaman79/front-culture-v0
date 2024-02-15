import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../modele/film' // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl = '/api/v1/films'; // Remplacez avec l'URL de l'API

  constructor(private http: HttpClient) { }

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl);
  }

   headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('access_token') || '' // Provide a fallback value
  });
 options = { headers: this.headers };
   // Méthode pour ajouter une liste de films
   addFilms(films: Film[]): Observable<any> {
    return this.http.post(this.apiUrl, films,this.options);
  }
}
