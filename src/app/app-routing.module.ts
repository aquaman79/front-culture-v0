import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { LandingComponent } from './landing/landing.component';
import { AdminAjouteFilmComponent } from './admin-ajoute-film/admin-ajoute-film.component';
import { LoginComponent } from './login/login.component'; // Assurez-vous d'avoir ce composant

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ajouter la route de connexion
  { path: '', component: LandingComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'ajout-film', component: AdminAjouteFilmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
