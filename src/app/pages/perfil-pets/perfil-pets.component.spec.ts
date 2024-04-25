import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPetsComponent } from './perfil-pets.component';

describe('PerfilPetsComponent', () => {
  let component: PerfilPetsComponent;
  let fixture: ComponentFixture<PerfilPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilPetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
