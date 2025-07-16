import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroComponent } from './carro.component';

describe('CarroComponent', () => {
  let component: CarroComponent;
  let fixture: ComponentFixture<CarroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarroComponent]
    });
    fixture = TestBed.createComponent(CarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('debería cargar el carrito desde localStorage si hay sesión activa', () => {
    const sesion = { logueado: true, email: 'test@correo.com' };
    localStorage.setItem('sesion', JSON.stringify(sesion));
    localStorage.setItem('carrito_test@correo.com', JSON.stringify([
      { nombre: 'Producto 1', precio: 1000, cantidad: 2 }
    ]));

    component.ngOnInit();

    expect(component.claveCarrito).toBe('carrito_test@correo.com');
    expect(component.carrito.length).toBe(1);
    expect(component.total).toBe(2000);
  });

  it('debería eliminar un producto por índice', () => {
    component.claveCarrito = 'carrito_test';
    component.carrito = [
      { nombre: 'Prod1', precio: 1000, cantidad: 1 },
      { nombre: 'Prod2', precio: 2000, cantidad: 2 }
    ];
    localStorage.setItem('carrito_test', JSON.stringify(component.carrito));

    component.eliminar(0);

    expect(component.carrito.length).toBe(1);
    expect(component.carrito[0].nombre).toBe('Prod2');
  });

  it('debería vaciar el carrito', () => {
    component.claveCarrito = 'carrito_test';
    localStorage.setItem('carrito_test', JSON.stringify([{ nombre: 'x', precio: 100, cantidad: 1 }]));
    component.carrito = [{ nombre: 'x', precio: 100, cantidad: 1 }];

    component.vaciarCarrito();

    expect(localStorage.getItem('carrito_test')).toBeNull();
    expect(component.carrito.length).toBe(0);
  });

  it('no debería actualizar si nueva cantidad < 1', () => {
    component.claveCarrito = 'carrito_test';
    component.carrito = [{ nombre: 'x', precio: 100, cantidad: 1 }];

    component.actualizarCantidad(0, 0);

    expect(component.carrito[0].cantidad).toBe(1);
  });

  it('debería actualizar la cantidad de un producto y recalcular total', () => {
    component.claveCarrito = 'carrito_test';
    component.carrito = [{ nombre: 'x', precio: 100, cantidad: 1 }];
    localStorage.setItem('carrito_test', JSON.stringify(component.carrito));

    component.actualizarCantidad(0, 5);

    expect(component.carrito[0].cantidad).toBe(5);
    expect(component.total).toBe(500);
  });

  it('debería alertar si el carrito está vacío al comprar', () => {
    spyOn(window, 'alert');
    component.carrito = [];

    component.comprar();

    expect(window.alert).toHaveBeenCalledWith('Carrito vacío.');
  });

  it('debería comprar si hay productos en el carrito', () => {
    spyOn(window, 'alert');
    spyOn(component, 'vaciarCarrito');
    component.carrito = [{ nombre: 'x', precio: 100, cantidad: 1 }];

    component.comprar();

    expect(window.alert).toHaveBeenCalledWith('¡Compra realizada!');
    expect(component.vaciarCarrito).toHaveBeenCalled();
  });



});
