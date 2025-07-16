import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';


describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let httpMock: HttpTestingController;

  const mockUsuarios = [
    { nombre: 'Juan', apellido: 'Pérez', email: 'juan@test.com', tipo: 'usuario' },
    { nombre: 'Ana', apellido: 'Gómez', email: 'ana@test.com', tipo: 'admin' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, HttpClientTestingModule, RouterTestingModule], 
          providers: [
            { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
          ]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Se crea componente llamando a la api', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('https://fpablo2200.github.io/json-api-usuarios-gams-fs2/usuarios.json');
    req.flush([]); // simula respuesta vacía
    expect(component).toBeTruthy();
  });

  it('debería cargar los usuarios desde el JSON al inicializar', fakeAsync(() => {
    fixture.detectChanges(); // ngOnInit se ejecuta
    const req = httpMock.expectOne('https://fpablo2200.github.io/json-api-usuarios-gams-fs2/usuarios.json');
    expect(req.request.method).toBe('GET');

    req.flush(mockUsuarios);
    tick(); // espera resolución de observables
    expect(component.usuarios.length).toBe(2);
    expect(component.usuarios[0].nombre).toBe('Juan');
  }));

  it('debería eliminar un usuario por su email', () => {
    fixture.detectChanges(); // Esto ejecuta ngOnInit y lanza el GET
  
    // Flusheamos la petición pendiente para evitar el error
    const req = httpMock.expectOne('https://fpablo2200.github.io/json-api-usuarios-gams-fs2/usuarios.json');
    req.flush(mockUsuarios);
  
    // Ahora ejecutamos la lógica de prueba
    component.eliminar('juan@test.com');
    expect(component.usuarios.length).toBe(1);
  });

  it('debería mostrar los usuarios en la tabla', fakeAsync(() => {
    fixture.detectChanges();

    const req = httpMock.expectOne('https://fpablo2200.github.io/json-api-usuarios-gams-fs2/usuarios.json');
    req.flush(mockUsuarios);
    tick();
    fixture.detectChanges();

    const filas = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(filas.length).toBe(2);

    const primeraFila = filas[0].nativeElement;
    expect(primeraFila.textContent).toContain('Juan');
    expect(primeraFila.textContent).toContain('Pérez');
  }));
});
