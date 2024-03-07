import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { LandingComponent } from './landing/landing.component';
import { AdminAjouteFilmComponent } from './admin-ajoute-film/admin-ajoute-film.component';
import { LoginComponent } from './login/login.component'; // Assurez-vous d'avoir ce composant

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Rediriger la route par défaut vers 'login'
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'ajout-film', component: AdminAjouteFilmComponent },
  // Ajoutez d'autres routes ici
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
