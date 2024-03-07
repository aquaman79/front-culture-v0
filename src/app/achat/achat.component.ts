import { AchatsService } from './../services/achats.service';
import { Component } from '@angular/core';
import { Film } from '../modele/film';
import { FilmService } from '../services/film.service';
@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrl: './achat.component.css'
})
export class AchatComponent {
  achats: Film[] = [];

  id =  localStorage.getItem("idUser");

  selectedFilm: Film | null = null;

  constructor(private achatService: AchatsService, private filmService : FilmService) {}

  ngOnInit() {
    this.getAchatFromBackend();
  }
  
  getAchatFromBackend() {
   // const panierData = localStorage.getItem('panier');
    //if (panierData) {
     // this.panier = JSON.parse(panierData);
    //}

    /*const achatData = localStorage.getItem('achats');
    if (achatData) {
      this.achats = JSON.parse(achatData);
    }*/
   
    
    this.achatService.getAchat(this.id).subscribe({
      next: (achats: Film[]) => {
        this.achats = achats;
      },
      error: (error) => console.error('Erreur lors de la récupération du panier', error)
    });
  }

  selectFilm(film: Film) {
    this.selectedFilm = film;
  } 
  closeDetails() {
    this.selectedFilm = null;
  }
  removeFromPanier(film: any ){

  }

  ajouteCommentaire(film: any ){
    this.filmService.modifieFilm(film,this.id).subscribe({
      next: (response) => {
        console.log('Films ajoutés avec succès', response);
        // Vous pouvez ici gérer la réinitialisation du formulaire ou d'autres actions de succès.
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout des films', error);
        // Gérer les erreurs ici
      }
    });;
  }


}
