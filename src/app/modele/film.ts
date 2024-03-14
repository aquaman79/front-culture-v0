export interface Commentaire {
  id: number;
  auteur: string;
  contenu: string;
  date: Date; // Optionnel, pour enregistrer quand le commentaire a été fait
}

// export interface Film {
//   id: number;
//   titre: string;
//   description: string;
//   date_sortie?: Date;
//   url_photo: string;
//   matchPercentage: number;
//   type: string; 
//   quality: string;
//   genres: string[];
//   duree?: number;
//   url_bande_annonce?: string;
//   comments?: Commentaire[]; // Ajout de la propriété comments
// }



export interface Film {
  id: number;
  titre: string;
  description: string;
  dateSortie?: Date;
  genre: string;
  duree?: number;
  urlBandeAnnonce: string;
  comments?: Commentaire[]; // Ajout de la propriété comments
  imageBase64 ?: string; 
}

// {
//   "titre": "ghhh",
//   "idsGenres": [8,9,10],
//   "genre" : "string" 
//   "description": "",
//   "dateSortie": "2023-08-12",
//   "duree": 1.30,
//   "imageBase64":""
//   videoBase64:""
 
// }


  // export interface Film {
  //   id: number;
  //   titre: string;
  //   description: string;
  //   date_sortie: Date; // ou string si vous traitez les dates sous forme de chaîne
  //   duree: number;
  //   url_bande_annonce: string;
  //   genres?: string[]; // Ce champ est dérivé de la relation entre Film et Genre
  // }
  