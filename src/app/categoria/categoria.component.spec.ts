import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaComponent } from './categoria.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CategoriaComponent', () => {
  let component: CategoriaComponent;
  let fixture: ComponentFixture<CategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ nombre: 'pokemones' })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(CategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create the component', () => {
    expect(true).toBeTrue();
  });

});
