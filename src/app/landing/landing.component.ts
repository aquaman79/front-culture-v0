import { Component } from '@angular/core';
import { Film } from '../modele/film';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  count = 0; // propriété pour garder le compte
  panier: Film[] = []; // Panier pour stocker les films ajoutés

  // Exemples de films
  films : Film[] = [
    {
      id: 1,
      titre: "Le Premier Film",
      description: "Ceci est une description du premier film kdkdkkdkdddddddddddddddddddddddddddddddddddddddddddddddddddddddddCeci est une description du premier film.kdkdkdkdkkdkd"     ,
      url_photo: "/assets/images/trending/img1.webp",
      matchPercentage: 98,
      type: "Film",
      quality: "HD",
      genres: ["Action", "Aventure"]
    },
    {
      id: 2,
      titre: "Le Deuxième Film",
      description: "Ceci est une description du deuxième film.",
      url_photo: "/assets/images/trending/img2.jpeg",
      matchPercentage: 95,
      type: "Documentaire",
      quality: "HD",
      genres: ["Documentaire", "Histoire"]
    },
    {
      id: 3,
      titre: "Le Troisième Film",
      description: "Ceci est une description du troisième film.",
      url_photo: "/assets/images/trending/img3.webp",
      matchPercentage: 93,
      type: "Série",
      quality: "4K",
      genres: ["Drame", "Mystère"]
    },
    {
      id: 4,
      titre: "Le Quatrième Film",
      description: "Ceci est une description du quatrième film.",
      url_photo: "/assets/images/trending/img4.jpeg",
      matchPercentage: 90,
      type: "Animation",
      quality: "HD",
      genres: ["Animation", "Famille"]
    },
    {
      id: 5,
      titre: "Le Cinquième Film",
      description: "Ceci est une description du cinquième film.",
      url_photo: "/assets/images/trending/img5.jpeg",
      matchPercentage: 89,
      type: "Thriller",
      quality: "HD",
      genres: ["Thriller", "Horreur"]
    }
  ];

  /*
 films: Film[] = [];
  count = 0;

  constructor(private filmService: FilmService) {}

  ngOnInit() {
    this.filmService.getFilms().subscribe(data => {
      this.films = data;
    });
  }


  */

  incrementCount() {
    this.count++;
  }

  addToPanier(film: Film) {
    this.panier.push(film);
    this.count = this.panier.length;
    localStorage.setItem('panier', JSON.stringify(this.panier));

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
