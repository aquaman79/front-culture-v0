export interface User {
    id?: number;
    username: string;
    nom: string;
    email: string;
    motDePasse: string;
    registrationDate?: Date;
    isAdmin?: boolean;
  }