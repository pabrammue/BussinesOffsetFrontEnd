import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../../Clases/pedido';
import { PedidoConDetallesProducto } from '../../Clases/PedidoConDetallesProducto';
import { PedidosConProductosYProveedores } from '../../Clases/pedidos-con-productos-yproveedores';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  urlApi="http://localhost:5030/api/pedido";
  constructor() { }
  http = inject(HttpClient); 

  getPedidos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.urlApi);   
  }

  getPedidoDetalles(id): Observable<PedidoConDetallesProducto>{
    return this.http.get<PedidoConDetallesProducto>(this.urlApi + "/" + id);
  }

  deletePedido(id): Observable<boolean>{
    return this.http.delete<boolean>(this.urlApi + "/" + id)
  }
}
