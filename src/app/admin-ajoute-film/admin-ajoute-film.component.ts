// admin-ajoute-film.component.ts
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-admin-ajoute-film',
  templateUrl: './admin-ajoute-film.component.html',
  styleUrls: ['./admin-ajoute-film.component.css']
})
export class AdminAjouteFilmComponent {
  filmForm: FormGroup;
  genres: string[] = ['historique', 'action', 'comedie', 'romantique', 'thriller'];


  constructor(private fb: FormBuilder,private filmService: FilmService) {
    this.filmForm = this.fb.group({
      films: this.fb.array([])
    });
    console.log(this.genres)
  }

  get getFilms(): FormArray {
    return this.filmForm.get('films') as FormArray;
  }

  addFilm() {
    const filmFormGroup = this.fb.group({
        titre: ['', Validators.required],
        description: ['', Validators.required],
        dateSortie: [''],
        genre: [null, Validators.required],
        // Ajoutez cette ligne pour l'image
        imageBase64: [null], // Vous pouvez initialiser à null ou à une chaîne vide
        urlBandeAnnonce: ['', Validators.required]

    });
    this.getFilms.push(filmFormGroup);
}

  

  removeFilm(index: number) {
    this.getFilms.removeAt(index);
  }

  onSave() {
    if (this.filmForm.valid) {
      const films = this.filmForm.value.films;
      this.filmService.addFilms(films).subscribe({
        next: (response) => {
          console.log('Films ajoutés avec succès', response);
          // Vous pouvez ici gérer la réinitialisation du formulaire ou d'autres actions de succès.
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout des films', error);
          // Gérer les erreurs ici
        }
      });
    }
  }

  onImageSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result as string;
        const pureBase64Image = base64Image.split(',')[1]; // Cela suppose que le résultat contient une virgule, séparant le préfixe de la partie Base64
        
        const filmArray = this.filmForm.get('films') as FormArray;
        if (filmArray) {
          const filmGroup = filmArray.at(index) as FormGroup;
          if (filmGroup) {
            const imageBase64Control = filmGroup.get('imageBase64');
            if (imageBase64Control) {
              imageBase64Control.setValue(pureBase64Image);
            }
          }
        }
      };
      
      reader.readAsDataURL(file);
    }
  }

  onVideoSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Video = e.target.result as string;
        // Casting vers FormArray, similaire à la méthode pour les images
        const filmArray = this.filmForm.get('films') as FormArray;
        if (filmArray) {
          // Utiliser FormGroup au lieu de AbstractControl, comme avec les images
          const filmGroup = filmArray.at(index) as FormGroup;
          if (filmGroup) {
            // Vous pouvez avoir un champ différent pour les vidéos, par exemple 'videoBase64'
            const videoBase64Control = filmGroup.get('videoBase64');
            if (videoBase64Control) {
              videoBase64Control.setValue(base64Video);
            }
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }
  

  get isAdmin(): boolean {
    const isAdminStr = localStorage.getItem("isAdmin");
    return isAdminStr === 'true';
  }
  
  
  
  
}
