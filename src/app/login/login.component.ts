import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; // Assurez-vous que le chemin est correct
import { User } from '../modele/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showSignUp: boolean = false;
  // Initialisez `user` comme un objet qui suit la structure de l'interface `User`
  user: User = {
    pseudo: '',
    nom: '',
    email: '',
    motDePasse: '',
    isAdmin: false // Ou omettez cette propriété si elle est optionnelle et définie côté serveur
  };

  constructor(private userService: UserService, private router: Router) {}

  showSignUpForm(): void {
    this.showSignUp = !this.showSignUp;
  }

  onSignUp(): void {
    this.userService.registerUser(this.user).subscribe({
      next: (response) => {
        if (response.status === 200 || response.status ===201 || response.id != null){
          this.router.navigate(['/login']); 
          this.showSignUpForm();
        }
      },
      error: (error) => {
        alert(Response.error+"erreur");
      }
    });
  }
  onSignIn(): void {
    // Supposant que `email` et `password` sont les propriétés de l'objet `user` utilisées pour la connexion
    this.userService.loginUser({
      username: this.user.email,
      motDePasse: this.user.motDePasse
    }).subscribe({
      next: (response) => {
        localStorage.setItem("access_token",response.jetonJWT)
        localStorage.setItem("idUser",response.utilisateur.id)
        localStorage.setItem("pseudo",response.utilisateur.pseudo)
        localStorage.setItem("isAdmin",response.utilisateur.isAdmin)
        console.log(response.jetonJWT)
        if (response.status === 200 || response.status ===201 || response.jetonJWT != null){
          this.router.navigate(['/landing']); 
        }
      },
      error: (error) => {
        console.error('Erreur lors de la connexion', error);
      }
    });
  }
  


}
