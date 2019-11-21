import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { IProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: IProductoDescripcion;
  id: string;

  constructor( private route: ActivatedRoute,
               public servicioProducto: ProductosService ) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.servicioProducto.getProducto(param['id'])
        .subscribe( ( prod: IProductoDescripcion ) => {
          this.id = param['id'];
          this.producto = prod;
        });
      }
    );
  }

}
