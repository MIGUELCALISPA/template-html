import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProducto } from '../interfaces/producto.interface';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;
  productos: IProducto[] = [];
  productosFiltrado: IProducto[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {

    return new Promise( (resolve, reject) => {

      this.http.get('https://template-angular-html.firebaseio.com/productos_idx.json')
      .subscribe(
        ( resp: IProducto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        }
      );

    });
  }

  getProducto( id: string) {
    return this.http.get(`https://template-angular-html.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto( termino: string ) {

    if ( this.productos.length === 0 ) {
      this.cargarProductos().then( () => {
        // se ejecuta después de tener los productos
        this.filtrarProductos( termino );
      });

    } else {
        this.filtrarProductos( termino );
    }

  }

  private filtrarProductos(termino: string ) {

    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino) >= 0 ) {
        this.productosFiltrado.push ( prod );
      }
    });
  }
}
