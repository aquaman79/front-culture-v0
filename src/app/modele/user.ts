export interface User {
    id?: number;
    pseudo: string;
    nom: string;
    email: string;
    motDePasse: string;
    isAdmin?: boolean;
  }