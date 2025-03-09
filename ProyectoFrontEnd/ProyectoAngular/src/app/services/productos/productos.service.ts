import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../../Clases/proveedor';
import { Producto } from '../../Clases/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  urlApi="https://apibusinessoffset.azurewebsites.net/api/proveedor";
  constructor() { }
  http = inject(HttpClient); 

  /**
   * Llamada a la api de proveedor para obtener los productos de un proveedor
   * @param idProveedor 
   * @returns 
   */
  getProductosProveedor(idProveedor): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlApi + "/" + idProveedor + "/productos");
  }

  /**
   * Llamada a la api de proveedor para obtener los productos de un proveedor y una categoria
   * @param idProveedor 
   * @param idCategorias 
   * @returns 
   */
  getProductoProveedoresCategoria(idProveedor, idCategorias):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlApi + "/" + idProveedor + "/categorias/" + idCategorias)
  }

}
