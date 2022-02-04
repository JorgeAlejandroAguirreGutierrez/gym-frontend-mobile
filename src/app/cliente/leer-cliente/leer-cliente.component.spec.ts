import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerClienteComponent } from './leer-cliente.component';

describe('LeerClienteComponent', () => {
  let component: LeerClienteComponent;
  let fixture: ComponentFixture<LeerClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
