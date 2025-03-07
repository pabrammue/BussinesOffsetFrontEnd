import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../../Clases/proveedor';
import { Producto } from '../../Clases/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  urlApi="http://localhost:5030/api/proveedor";
  constructor() { }
  http = inject(HttpClient); 

  getProductosProveedor(idProveedor): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlApi + "/" + idProveedor + "/productos");
  }

  getProductoProveedoresCategoria(idProveedor, idCategorias):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlApi + "/" + idProveedor + "/categorias/" + idCategorias)
  }

}
