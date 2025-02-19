import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEnConstruccionComponent } from './pagina-en-construccion.component';

describe('PaginaEnConstruccionComponent', () => {
  let component: PaginaEnConstruccionComponent;
  let fixture: ComponentFixture<PaginaEnConstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaEnConstruccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaEnConstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
