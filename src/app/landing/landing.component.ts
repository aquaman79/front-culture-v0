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
  groupedFilms: Film[][]  = [];
  selectedFilm: Film | null = null;


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
      genres: ["Action", "Aventure"],
      comments: [
        {
          id: 1,
          auteur: "Jean",
          contenu: "J'ai vraiment aimé ce film, surtout les scènes d'action !",
          date: new Date('2022-01-01')
        },
        {
          id: 2,
          auteur: "Marie",
          contenu: "Belle histoire, mais je pense que le rythme aurait pu être amélioré.",
          date: new Date('2022-01-02')
        },
        {
          id: 1,
          auteur: "Jean",
          contenu: "J'ai vraiment aimé ce film, surtout les scènes d'action !",
          date: new Date('2022-01-01')
        },
      ]
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
    },
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

  selectFilm(film: Film) {
    this.selectedFilm = film;
  } 
  closeDetails() {
    this.selectedFilm = null;
  }
  
  ngOnInit() {
    this.groupFilms();
    this.extractUniqueGenres(); // Nouvelle méthode pour extraire les genres

  }
  genres: string[] = [];
  extractUniqueGenres() {
    const allGenres = this.films.flatMap(film => film.genres);
    this.genres = [...new Set(allGenres)];
  }
  

  genresGroupedFilms: { [genre: string]: Film[] } = {};

  groupFilms() {
    const groupSize = 4; // Taille de groupe pour le carrousel
    // Réinitialiser les groupes à chaque appel
    this.groupedFilms = [];
    let genresMap: { [key: string]: Film[] } = {};
  
    // Groupement par trending (déjà existant)
    for (let i = 0; i < this.films.length; i += groupSize) {
      this.groupedFilms.push(this.films.slice(i, i + groupSize));
    }
  
    // Nouveau groupement par genres
    this.films.forEach(film => {
      film.genres.forEach(genre => {
        if (!genresMap[genre]) {
          genresMap[genre] = [];
        }
        genresMap[genre].push(film);
      });
    });
  
    this.genresGroupedFilms = genresMap;
  }
  

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
