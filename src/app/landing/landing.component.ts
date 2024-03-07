import { Component } from '@angular/core';
import { Film } from '../modele/film';
import { FilmService } from '../services/film.service';
import { PanierService } from '../services/panier.service';

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


 //Exemples de films
 /*
  films : Film[] = [
    {
        id: 2,
        titre: "Le Deuxième Film",
        description: "Ceci est une description du deuxième film.",
        genre: "Documentaire",
        imageBase64: "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",
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
      id: 3,
      titre: "Le Deuxième Film couso",
      description: "Ceci est une description du deuxième film.",
      genre: "Documentaire"
    },
    {
      id: 2,
      titre: "Le Deuxième Film",
      description: "Ceci est une description du deuxième film.",
      genre: "Documentaire"
    },
    {
      id: 2,
      titre: "Le Deuxième Film",
      description: "Ceci est une description du deuxième film.",
      genre: "Documentaire"
    },
    {
      id: 2,
      titre: "Le Deuxième Film",
      description: "Ceci est une description du deuxième film.",
      genre: "Documentaire"
    },
    {
      id: 2,
      titre: "Le Deuxième Film",
      description: "Ceci est une description du deuxième film.",
      genre: "Documentaire"
    },
    {
      id: 2,
      titre: "Le Deuxième Film",
      description: "Ceci est une description du deuxième film.",
      genre: "Documentaire1"
    },
    {
      id: 2,
      titre: "Le Deuxième Film",
      description: "Ceci est une description du deuxième film.",
      genre: "Documentaire1"
    },
    {
      id: 2,
      titre: "Le Deuxième Film",
      description: "Ceci est une description du deuxième film.",
      genre: "Documentaire1"
    },
    {
      id: 2,
      titre: "Le Deuxième Film",
      description: "Ceci est une description du deuxième film.",
      genre: "Documentaire1"
    },
   ]
  //   {
  //     id: 3,
  //     titre: "Le Troisième Film",
  //     description: "Ceci est une description du troisième film.",
  //     url_photo: "/assets/images/trending/img3.webp",
  //     matchPercentage: 93,
  //     type: "Série",
  //     quality: "4K",
  //     genres: ["Drame", "Mystère"]
  //   },
  //   {
  //     id: 4,
  //     titre: "Le Quatrième Film",
  //     description: "Ceci est une description du quatrième film.",
  //     url_photo: "/assets/images/trending/img4.jpeg",
  //     matchPercentage: 90,
  //     type: "Animation",
  //     quality: "HD",
  //     genres: ["Animation", "Famille"]
  //   },
  //   {
  //     id: 5,
  //     titre: "Le Cinquième Film",
  //     description: "Ceci est une description du cinquième film.",
  //     url_photo: "/assets/images/trending/img5.jpeg",
  //     matchPercentage: 89,
  //     type: "Thriller",
  //     quality: "HD",
  //     genres: ["Thriller", "Horreur"]
  //   },
  //   {
  //     id: 1,
  //     titre: "Le Premier Film",
  //     description: "Ceci est une description du premier film kdkdkkdkdddddddddddddddddddddddddddddddddddddddddddddddddddddddddCeci est une description du premier film.kdkdkdkdkkdkd"     ,
  //     url_photo: "/assets/images/trending/img1.webp",
  //     matchPercentage: 98,
  //     type: "Film",
  //     quality: "HD",
  //     genres: ["Action", "Aventure"]
  //   },
  //   {
  //     id: 2,
  //     titre: "Le Deuxième Film",
  //     description: "Ceci est une description du deuxième film.",
  //     url_photo: "/assets/images/trending/img2.jpeg",
  //     matchPercentage: 95,
  //     type: "Documentaire",
  //     quality: "HD",
  //     genres: ["Documentaire", "Histoire"]
  //   },
  //   {
  //     id: 3,
  //     titre: "Le Troisième Film",
  //     description: "Ceci est une description du troisième film.",
  //     url_photo: "/assets/images/trending/img3.webp",
  //     matchPercentage: 93,
  //     type: "Série",
  //     quality: "4K",
  //     genres: ["Drame", "Mystère"]
  //   },
  //   {
  //     id: 4,
  //     titre: "Le Quatrième Film",
  //     description: "Ceci est une description du quatrième film.",
  //     url_photo: "/assets/images/trending/img4.jpeg",
  //     matchPercentage: 90,
  //     type: "Animation",
  //     quality: "HD",
  //     genres: ["Animation", "Famille"]
  //   },
  //   {
  //     id: 5,
  //     titre: "Le Cinquième Film",
  //     description: "Ceci est une description du cinquième film.",
  //     url_photo: "/assets/images/trending/img5.jpeg",
  //     matchPercentage: 89,
  //     type: "Thriller",
  //     quality: "HD",
  //     genres: ["Thriller", "Horreur"]
  //   }
  // ];

  */
 films: Film[] = [];

  constructor(private filmService: FilmService, private panierService: PanierService) {}

  /* ngOnInit() {
     this.filmService.getFilms().subscribe(data => {
       this.films = data;
     });
   }*/



  selectFilm(film: Film) {
    this.selectedFilm = film;
  } 
  closeDetails() {
    this.selectedFilm = null;
  }
  
   ngOnInit() {
    this.filmService.getFilms().subscribe(data => {
       this.films = data;
       this.groupFilms();
       this.extractUniqueGenres(); // Nouvelle méthode pour extraire les genres
     });

    //this.groupFilms();
     console.log("je suis ici");
     console.log(this.genresGroupedFilms);

    //this.extractUniqueGenres();
  
   

  }
  genres: string[] = [];
  extractUniqueGenres() {
    const allGenres = this.films.flatMap(film => film.genre);
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
  
    // Nouveau groupement par genre (en considérant un seul genre par film)
    this.films.forEach((film: Film) => {
      // Accès direct au genre du film au lieu de parcourir un tableau
      const genre = film.genre; // Utilisez 'genre' au lieu de 'genres'
      if (!genresMap[genre]) {
        genresMap[genre] = [];
      }
      genresMap[genre].push(film);
    });
  
    this.genresGroupedFilms = genresMap;
  }
  
  incrementCount() {
    this.count++;
  }

// Dans PanierComponent
idUser = localStorage.getItem("idUser");
addToPanier(film: Film) {
  // Vérifier si le film est déjà dans le panier en cherchant son id
  const filmExiste = this.panier.find(f => f.id === film.id);

  // Si le film n'existe pas déjà dans le panier, l'ajouter et mettre à jour via le backend
  if (!filmExiste) {
 /*   this.panier.push(film);
    this.count = this.panier.length; // Mettre à jour le compteur de films dans le panier
    localStorage.setItem('panier', JSON.stringify(this.panier));
    */
    this.count = this.panier.length;
    // Mettre à jour le panier dans le backend
    this.panierService.postPanier(this.panier,this.idUser).subscribe({
      next: (response: any ) => console.log('Panier mis à jour avec succès', response),
      error: (error: any ) => console.error('Erreur lors de la mise à jour du panier', error)
    });
  }
}

removeFromPanier(film: Film) {
  const index = this.panier.findIndex(f => f.id === film.id);

  if (index > -1) {
  /*  this.panier.splice(index, 1); // Supprimer le film du tableau
    this.count = this.panier.length; // Mettre à jour le compteur de films dans le panier*/

    // Mettre à jour le panier dans le backend
    this.count = this.panier.length;
    this.panierService.postPanier(this.panier,this.idUser).subscribe({
      next: (response) => console.log('Panier mis à jour avec succès', response),
      error: (error) => console.error('Erreur lors de la mise à jour du panier', error)
    });
  }
}

}
