import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sesion: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  this.auth.sesion$.subscribe(sesion => {
    this.sesion = sesion;
  });
}


  cerrarSesion() {
    this.auth.cerrarSesion();
    this.router.navigate(['/']);
  }
}