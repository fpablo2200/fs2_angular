import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  error: string = '';
  exito: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required]],
      rut: ['', [Validators.required, this.rutChilenoValidator]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, this.edadMinimaValidator]],
      direccion: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password2: ['', Validators.required]
    }, { validators: [this.passwordsIgualesValidator] });
  }

  //edad
  edadMinimaValidator(control: AbstractControl): ValidationErrors | null {
    const fecha = new Date(control.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }
    return edad < 14 ? { edadMinima: true } : null;
  }

  // contraseñas
  passwordsIgualesValidator(group: AbstractControl): ValidationErrors | null {
    const pass1 = group.get('password')?.value;
    const pass2 = group.get('password2')?.value;
    return pass1 === pass2 ? null : { contrasenasNoCoinciden: true };
  }

  // rut
  rutChilenoValidator(control: AbstractControl): ValidationErrors | null {
    const rut = control.value;
    if (!rut || typeof rut !== 'string') return { rutInvalido: true };
  
    const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
  
    if (!/^[0-9]+[0-9K]$/.test(rutLimpio)) {
      return { rutInvalido: true };
    }
  
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);
  
    let suma = 0;
    let multiplo = 2;
  
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
  
    const dvEsperado = 11 - (suma % 11);
    let dvCalculado = '';
  
    if (dvEsperado === 11) {
      dvCalculado = '0';
    } else if (dvEsperado === 10) {
      dvCalculado = 'K';
    } else {
      dvCalculado = dvEsperado.toString();
    }
  
    return dvCalculado === dv ? null : { rutesInvalido: true };
  }

  registrar() {
    this.error = '';
    this.exito = '';

    if (this.registerForm.invalid) {
      this.error = 'Revisa los campos, hay errores en el formulario.';
      return;
    }

    const { nombre, apellido, telefono , rut , fechaNacimiento , direccion, email, password } = this.registerForm.value;

    const nuevoUsuario = {
      nombre,
      apellido,
      telefono,
      rut,
      email,
      fechaNacimiento,
      direccion,
      password,
      tipo: 'usuario'
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.exito = 'Usuario registrado con éxito. Ahora puedes iniciar sesión.';
    setTimeout(() => this.router.navigate(['/login']), 1500);
  }

  // Accesos rápidos a los campos del formulario desde la vista
  get f() {
    return this.registerForm.controls;
  }
}
