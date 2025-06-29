import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoria = '';
  cartas: any[] = [];

  private datos: any = {
    pokemones: [
      { nombre: 'Gyarados EX', imagen: '../../assets/img/pokemon/pk1.jpg', precio: 21990, descuento: 1 },
      { nombre: 'Pikachu VMax', imagen: '../../assets/img/pokemon/pk2.jpg', precio: 21990, descuento: 0 },
      { nombre: 'Mewtwo', imagen: '../../assets/img/pokemon/pk3.jpg', precio: 21990, descuento: 0 },
      { nombre: 'Dragonite V', imagen: '../../assets/img/pokemon/pk4.jpg', precio: 21990, descuento: 1 }
    ],
    energias: [
      { nombre: 'Energía Psíquica', imagen: '../../assets/img/energias/en1.jpg', precio: 1990 , descuento: 1 },
      { nombre: 'Energía Agua', imagen: '../../assets/img/energias/en2.jpg', precio: 1990 , descuento: 1 },
      { nombre: 'Energía Metal', imagen: '../../assets/img/energias/en3.jpg', precio: 1990 , descuento: 1 },
      { nombre: 'Energía Lucha', imagen: '../../assets/img/energias/en4.jpg', precio: 1990 , descuento: 1 }
    ],
    partidario: [
      { nombre: 'Observaciones del profesor', imagen: '../../assets/img/partidario/pa1.jpg', precio: 6990 , descuento: 1 },
      { nombre: 'Blasco', imagen: '../../assets/img/partidario/pa2.jpg', precio: 6990 , descuento: 1 },
      { nombre: 'Atracción de Ariana', imagen: '../../assets/img/partidario/pa3.jpg', precio: 6990 , descuento: 1 },
      { nombre: 'GHerrero', imagen: '../../assets/img/partidario/pa4.jpg', precio: 6990 , descuento: 1 }
    ],
    apoyo: [
      { nombre: 'Restos', imagen: '../../assets/img/apoyo/ap1.jpg', precio: 5990 , descuento: 1 },
      { nombre: 'Chaleco Asalto', imagen: '../../assets/img/apoyo/ap2.jpg', precio: 5990 , descuento: 1 },
      { nombre: 'Cinta Desafio', imagen: '../../assets/img/apoyo/ap3.jpg', precio: 5990 , descuento: 1 },
      { nombre: 'Camilla de rescate', imagen: '../../assets/img/apoyo/ap4.jpg', precio: 5990 , descuento: 1 }
    ]
  };

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) { }


  sesion: any = null;

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    this.route.params.subscribe(params => {
      this.categoria = params['nombre'];
      this.cartas = this.datos[this.categoria] || [];
    });
  }

  agregarAlCarrito(carta: any) {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (!sesion || sesion.tipo !== 'usuario') {
      alert('Debes iniciar sesión como usuario para agregar al carrito.');
      return;
    }

    const claveCarrito = 'carrito_' + sesion.email;
    const carritoStr = localStorage.getItem(claveCarrito);
    const carrito = carritoStr ? JSON.parse(carritoStr) : [];

    const index = carrito.findIndex((item: any) => item.nombre === carta.nombre);

    if (index >= 0) {
      carrito[index].cantidad++;
    } else {
      carrito.push({
        nombre: carta.nombre,
        img: carta.imagen,
        categoria: this.categoria,
        precio: carta.precio,
        cantidad: 1
      });
    }

    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    alert('¡Agregado al carrito con éxito!');
  }

}

