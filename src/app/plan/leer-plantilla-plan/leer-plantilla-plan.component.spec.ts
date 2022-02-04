import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerPlantillaPlanComponent } from './leer-plantilla-plan.component';

describe('LeerPlantillaPlanComponent', () => {
  let component: LeerPlantillaPlanComponent;
  let fixture: ComponentFixture<LeerPlantillaPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerPlantillaPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerPlantillaPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
