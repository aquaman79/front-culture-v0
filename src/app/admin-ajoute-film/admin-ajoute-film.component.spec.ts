import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAjouteFilmComponent } from './admin-ajoute-film.component';

describe('AdminAjouteFilmComponent', () => {
  let component: AdminAjouteFilmComponent;
  let fixture: ComponentFixture<AdminAjouteFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAjouteFilmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAjouteFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
