import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { LandingComponent } from './landing/landing.component';
import { AdminAjouteFilmComponent } from './admin-ajoute-film/admin-ajoute-film.component';
import { LoginComponent } from './login/login.component'; // Assurez-vous d'avoir ce composant
import { AchatComponent } from './achat/achat.component';
import { AuthGuard } from './services/auth.guard'; // Ajustez le chemin selon votre structure
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'panier', component: PanierComponent, canActivate: [AuthGuard] },
  { path: 'ajout-film', component: AdminAjouteFilmComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'achats', component: AchatComponent, canActivate: [AuthGuard] }
  // Autres routes protégées ici...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
