import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;
  productos: IProducto[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {
    this.http.get('https://template-angular-html.firebaseio.com/productos_idx.json')
    .subscribe(
      ( resp: IProducto[]) => {
        console.log(resp);
        this.productos = resp;
        this.cargando = false;
        // setTimeout(() => {
        //   this.cargando = false;
        // }, 2000);
      }
    );
  }
}
