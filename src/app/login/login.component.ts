import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  error: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(4)]
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  // creamos la ssession al logear
  login() {
    this.error = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const usuario = usuarios.find((u: any) =>
      u.email === email && u.password === password
    );

    if (usuario) {
      localStorage.setItem('sesion', JSON.stringify({
        logueado: true,
        usuario: usuario.usuario,
        tipo: usuario.tipo || 'usuario'
      }));

      window.location.href = usuario.tipo === 'admin' ? '/admin' : '/perfil';
    } else {
      this.error = true;
    }
  }
}
