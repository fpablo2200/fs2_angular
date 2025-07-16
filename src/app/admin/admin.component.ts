import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  usuarios: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.http.get<any[]>('https://fpablo2200.github.io/json-api-usuarios-gams-fs2/usuarios.json')
      .subscribe(data => {
        this.usuarios = data;
      });
  }

  // Eliminar usuario por email 
  eliminar(email: String): void {
    this.usuarios = this.usuarios.filter(j => j.email !== email); // Eliminacion simulada
  }

}