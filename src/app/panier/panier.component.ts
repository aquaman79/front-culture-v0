import { Component } from '@angular/core';
import { Film } from '../modele/film';
import { count } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {

  panier: Film[] = [];
  count ?: number

  constructor() {}

  ngOnInit() {
    this.loadPanierFromLocalStorage();
  }
  
  loadPanierFromLocalStorage() {
    const panierData = localStorage.getItem('panier');
    if (panierData) {
      this.panier = JSON.parse(panierData);
    }
    this.count = this.panier.length;
  }

  removeFromPanier(film: Film) {
    const index = this.panier.findIndex(f => f.id === film.id);
    
    if (index > -1) {
      this.panier.splice(index, 1); // Supprimer le film du tableau
      this.count = this.panier.length;
      localStorage.setItem('panier', JSON.stringify(this.panier)); // Mettre à jour le localStorage
    }
  }
  

}
