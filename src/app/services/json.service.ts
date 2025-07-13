import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuarios {
  id: number;
  titulo: string;
  categoria: string;
  fecha_lanzamiento: string;
}

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  private apiUrl = 'https://fpablo2200.github.io/json-api-usuarios-gams-fs2/usuarios.json';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.apiUrl);
  }
}
