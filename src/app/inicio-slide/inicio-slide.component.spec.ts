import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSlideComponent } from './inicio-slide.component';

describe('InicioSlideComponent', () => {
  let component: InicioSlideComponent;
  let fixture: ComponentFixture<InicioSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
