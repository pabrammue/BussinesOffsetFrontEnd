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
  urlApi="https://apibusinessoffset.azurewebsites.net/api/pedido";
  constructor() { }
  http = inject(HttpClient); 

  /**
   * Llamada a la api de pedidos de un Get
   * @returns todos los pedidos
   */
  getPedidos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.urlApi);   
  }

  /**
   * Llamada a la api de pedidos de un Get(id)
   * @param id 
   * @returns el pedido encontrado
   */
  getPedidoDetalles(id): Observable<PedidoConDetallesProducto>{
    return this.http.get<PedidoConDetallesProducto>(this.urlApi + "/" + id);
  }

  /**
   * Llamada a la api de pedidos de un Post
   * @param nuevoPedido 
   * @returns pedidoCreado
   */
  postPedido(nuevoPedido: PedidoConDetallesProducto): Observable<PedidoConDetallesProducto>{
    return this.http.post<PedidoConDetallesProducto>(this.urlApi, nuevoPedido);
  }

  /**
   * Llamada a la api de pedidos de un Patch
   * @param id 
   * @returns boolean
   */
  cancelarPedido(id): Observable<boolean>{
    return this.http.patch<boolean>(this.urlApi + "/" + id, {})
  }
}
