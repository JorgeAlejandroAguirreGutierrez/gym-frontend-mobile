import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerMedidaComponent } from './leer-medida.component';

describe('LeerMedidaComponent', () => {
  let component: LeerMedidaComponent;
  let fixture: ComponentFixture<LeerMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerMedidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
