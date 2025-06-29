import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {

  carrito: any[] = [];
  total = 0;
  claveCarrito = '';

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (sesion?.logueado) {
      this.claveCarrito = 'carrito_' + sesion.email;
      this.cargarCarrito();
    }
  }

  cargarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem(this.claveCarrito) || '[]');
    this.total = this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  }

  eliminar(index: number) {
    this.carrito.splice(index, 1);
    localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

  vaciarCarrito() {
    localStorage.removeItem(this.claveCarrito);
    this.cargarCarrito();
  }

  comprar() {
    if (this.carrito.length === 0) {
      alert('Carrito vacío.');
      return;
    }

    alert('¡Compra realizada!');
    this.vaciarCarrito();
  }

  actualizarCantidad(index: number, nuevaCantidad: number) {
    if (nuevaCantidad < 1) return;

    this.carrito[index].cantidad = nuevaCantidad;
    localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }
}
