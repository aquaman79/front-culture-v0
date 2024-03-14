import { AchatsService } from './../services/achats.service';
import { Component } from '@angular/core';
import { Commentaire, Film } from '../modele/film';
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
  pseudo : string | null = null;

  constructor(private achatService: AchatsService, private filmService : FilmService) {}

  ngOnInit() {
    this.getAchatFromBackend();
    this.pseudo = localStorage.getItem("pseudo") || 'Utilisateur inconnu'; // Assurez-vous d'avoir une valeur par défaut

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

  newCommentAuthor: string = '';
  newCommentContent: string = '';

  onSubmitComment() {
    if (this.selectedFilm) { // Assurez-vous que selectedFilm n'est pas null
      const newComment: Commentaire = {
        id : 0 , // Laissez le backend définir l'ID
        auteur: this.newCommentAuthor,
        contenu: this.newCommentContent,
        date: new Date(), // Définissez la date actuelle, si votre backend ne le fait pas
      };
  
      // Vérification si la liste des commentaires existe, sinon la créer
      if (!this.selectedFilm.comments) {
        this.selectedFilm.comments = [];
      }
  
      // Ajout du nouveau commentaire à la liste des commentaires du film sélectionné
      this.selectedFilm.comments.push(newComment);
  
      // Appel de la méthode pour mettre à jour le film avec le nouveau commentaire
      this.ajouteCommentaire(this.selectedFilm);
    
      // Réinitialisation des champs du formulaire
      this.newCommentAuthor = '';
      this.newCommentContent = '';
    }
  }
  
  ajouteCommentaire(film: Film) {
    if (film.id) { // Vérifiez que le film a un ID valide
      this.filmService.modifieFilm(film, this.id).subscribe({
        next: (response) => {
          console.log('Film modifié avec succès', response);
          // Ici, vous pourriez vouloir mettre à jour l'interface utilisateur en conséquence
        },
        error: (error) => {
          console.error('Erreur lors de la modification du film', error);
        }
      });
    }
  }
  


}
