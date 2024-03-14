import { Component, OnInit } from '@angular/core';
import { Film } from '../modele/film';
import { PanierService } from '../services/panier.service'; // Assurez-vous que le chemin est correct
import { AchatsService } from '../services/achats.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'] // Corrigé pour utiliser styleUrls et sous forme de tableau
})
export class PanierComponent implements OnInit {
  panier: Film[] = [];
  count: number = 0;
  achat: Film[] = [];

  id =  localStorage.getItem("idUser");

  constructor(private panierService: PanierService, private achatService: AchatsService) {}

  ngOnInit() {
    this.getPanierFromBackend();
  }
  
  getPanierFromBackend() {
    /*const panierData = localStorage.getItem('panier');
    if (panierData) {
      this.panier = JSON.parse(panierData);
    }*/
    //this.count = this.panier.length;
    
    this.panierService.getPanier(this.id).subscribe({
      next: (panier: Film[]) => {
        this.panier = panier;
        this.count = this.panier.length;
      },
      error: (error) => console.error('Erreur lors de la récupération du panier', error)
    });
  }
  removeFromPanier(film: Film) {
    const index = this.panier.findIndex(f => f.id === film.id);
    
    if (index > -1) {
      this.panier.splice(index, 1);
      this.count = this.panier.length;
      localStorage.setItem('panier', JSON.stringify(this.panier)); // Mettre à jour le localStorage

      /*
      this.panierService.postPanier(this.panier).subscribe({
        next: (response) => console.log('Panier mis à jour avec succès', response),
        error: (error) => console.error('Erreur lors de la mise à jour du panier', error)
      });*/
    }
  }


  commander() {
    if (this.panier.length > 0) {


     // this.count = this.panier.length; // Mettre à jour le compteur de films dans le panier
      //localStorage.setItem('achats', JSON.stringify(this.panier));
      // Appel au service pour envoyer la commande
      this.achatService.postAchat(this.panier,this.id).subscribe({
        next: (response:any ) => {
          console.log('Commande passée avec succès', response);
          // Ici, vous pourriez vouloir vider le panier après une commande réussie
          this.panier = [];
          this.count = 0;
          // Optionnellement, mettre à jour le panier sur le backend si nécessaire
           this.panierService.postPanier(this.panier,this.id).subscribe();
        },
        error: (error: any ) => console.error('Erreur lors de la commande', error)
      });
    } else {
      console.log('Le panier est vide');
    }
  }
  
  get isAdmin(): boolean {
    const isAdminStr = localStorage.getItem("isAdmin");
    return isAdminStr === 'true';
  }
  

}
