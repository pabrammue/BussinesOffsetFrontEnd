import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../../Clases/proveedor';
import { Categoria } from '../../Clases/categoria';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  urlApi="https://apibusinessoffset.azurewebsites.net/api/proveedor";
  constructor() { }
  http = inject(HttpClient); 

  /**
   * Método que devuelve todos lso proveedores
   * @returns 
   */
  getProveedores(): Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.urlApi);
  }

  /**
   * Llamada a la api para un Get(id) de los proveedores
   * @param idProveedor 
   * @returns 
   */
  getCategoriasProveedor(idProveedor): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlApi + "/" + idProveedor + "/" + "categorias")
  }
}
