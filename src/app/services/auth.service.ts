import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sesionSubject = new BehaviorSubject<any>(this.getSesion());
  sesion$ = this.sesionSubject.asObservable();

  constructor() {
  const usuariosStr = localStorage.getItem('usuarios');
  if (!usuariosStr) {
    const admin = {
      nombre: "Administrador",
      apellido: "Administrador",
      telefono: "9555555555",
      rutInput: "18924258-5",
      fechaNacimiento: "17-28-1999",
      direccion: "Test",
      usuario: "admin",
      email: "admin@gamecard.com",
      password: "@Admin123", 
      tipo: "admin" 
    };
    localStorage.setItem('usuarios', JSON.stringify([admin]));
  }
}


  getSesion() {
    const sesion = localStorage.getItem('sesion');
    return sesion ? JSON.parse(sesion) : null;
  }

  estaLogueado(): boolean {
    const sesion = this.getSesion();
    return sesion?.logueado || false;
  }

  esAdmin(): boolean {
    const sesion = this.getSesion();
    return sesion?.tipo === 'admin';
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.sesionSubject.next(null);
  }

  iniciarSesion(sesionData: any): void {
    localStorage.setItem('sesion', JSON.stringify(sesionData));
    this.sesionSubject.next(sesionData);
  }

  addUser(user: any): boolean {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const existe = usuarios.some((u: any) => u.email === user.email);
  if (existe) return false;
  usuarios.push(user);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  return true;
}

}
