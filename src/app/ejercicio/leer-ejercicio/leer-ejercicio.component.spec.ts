import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerEjercicioComponent } from './leer-ejercicio.component';

describe('LeerEjercicioComponent', () => {
  let component: LeerEjercicioComponent;
  let fixture: ComponentFixture<LeerEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerEjercicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
