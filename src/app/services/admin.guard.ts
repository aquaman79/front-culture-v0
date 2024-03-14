// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAuthenticated === 'true' && isAdmin === 'true') {
      return true; // L'utilisateur est authentifié et admin
    } else {
      this.router.navigate(['/landing']); // Redirige vers une page d'erreur ou d'accueil pour non-admins
      return false; // Bloque l'accès à la route
    }
  }
}
