import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent], 
      imports: [ReactiveFormsModule], 
      providers: [
        { provide: Router, useValue: { navigate: () => {} } } 
      ]
    }).compileComponents(); 

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  //pruebas registro

  //formulario vacio
  it('debería marcar el formulario como inválido si los campos están vacíos', () => {
    component.registerForm.setValue({
      nombre: '',
      apellido: '',
      telefono: '',
      rut: '',
      email: '',
      fechaNacimiento: '',
      direccion: '',
      password: '',
      password2: ''
    });
    expect(component.registerForm.invalid).toBeTrue();
  });


  //contraseñas
  it('debería marcar error si las contraseñas no coinciden', () => {
    component.registerForm.setValue({
      nombre: 'test',
      apellido: 'test',
      telefono: 955555555,
      rut: '17924425-k',
      email: 'test@test.cl',
      fechaNacimiento: '2000-05-02',
      direccion: 'test direccion',
      password: 'qwerasdf',
      password2: 'fdsareeq'
    });
    expect(component.registerForm.errors?.['contrasenasNoCoinciden']).toBeTrue();
  });

  it('debería marcar error si el rut no es valido', () => {
    component.registerForm.setValue({
      nombre: 'test',
      apellido: 'test',
      telefono: 955555555,
      rut: '17924425-0',
      email: 'test@test.cl',
      fechaNacimiento: '2000-05-02',
      direccion: 'test direccion',
      password: 'qwerasdf',
      password2: 'qwerasdf'
    });

    fixture.detectChanges();

    const rutControl = component.registerForm.get('rut');

    expect(rutControl?.invalid).toBeTrue();
    console.log(rutControl?.errors);
    expect(rutControl?.errors?.['rutesInvalido']).toBeTrue();
  });

});
