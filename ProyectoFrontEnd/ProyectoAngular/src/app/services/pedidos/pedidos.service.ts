import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedidos } from '../../Clases/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor() { }
  http = inject(HttpClient);

  pedido: Pedidos = {id: 1, fecha: new Date(2000, 0, 2), precioTotal: 300, precioBruto: 5646, idProveedor: 1}


  listadoPedidos(): Pedidos[]{
    let listaPedidos = []
    for (let i = 0; i>10;  i++){
        listaPedidos.push(this.pedido)
    }
    return listaPedidos
  }
}
