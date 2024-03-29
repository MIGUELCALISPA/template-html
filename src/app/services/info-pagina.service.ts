import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { IEquipo } from '../interfaces/equipo-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada: boolean = false;
  equipo: IEquipo[] = [];

  constructor(private http: HttpClient) {

    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
    .subscribe( ( resp: InfoPagina ) => {

      this.cargada = true;
      this.info = resp;
    });
  }

  private cargarEquipo() {
    this.http.get('https://template-angular-html.firebaseio.com/equipo.json')
    .subscribe( (resp: IEquipo[]) => {
      this.equipo = resp;
    });
  }
}
