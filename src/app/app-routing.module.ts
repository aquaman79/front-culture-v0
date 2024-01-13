import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'panier', component: PanierComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
