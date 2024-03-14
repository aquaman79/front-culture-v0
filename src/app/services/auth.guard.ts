import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthentified = localStorage.getItem('isAuthentified');
    if (isAuthentified === 'true') {
      return true; // Permet l'accès à la route
    } else {
      this.router.navigate(['/login']); // Redirige vers la page de connexion
      return false; // Empêche l'accès à la route
    }
  }
}
