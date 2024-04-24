import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPetsComponent } from './cadastro-pets.component';

describe('CadastroPetsComponent', () => {
  let component: CadastroPetsComponent;
  let fixture: ComponentFixture<CadastroPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroPetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
