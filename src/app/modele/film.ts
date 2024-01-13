export interface Film {
    id: number;
    titre: string;
    description: string;
    date_sortie?: Date;
    url_photo: string,
    matchPercentage: number,
    type: string, 
    quality: string,
    genres: string[];
    duree?: number;
    url_bande_annonce?: string;
   // imageBase64: string;
  }
  