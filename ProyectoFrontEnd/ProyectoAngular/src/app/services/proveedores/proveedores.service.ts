import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../../Clases/proveedor';
import { Categoria } from '../../Clases/categoria';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  urlApi="http://localhost:5030/api/proveedor";
  constructor() { }
  http = inject(HttpClient); 

  getProveedores(): Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.urlApi);
  }

  getCategoriasProveedor(idProveedor): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlApi + "/" + idProveedor + "/" + "categorias")
  }
}
