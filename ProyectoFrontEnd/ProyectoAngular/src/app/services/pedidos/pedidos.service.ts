import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../../Clases/pedido';
import { PedidosConProductosYProveedores } from '../../Clases/pedidos-con-productos-yproveedores';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor() { }
  //http = inject(HttpClient); //esto hace que nada del html se vea

  pedido: Pedido = {id: 1, fecha: new Date(2000, 0, 2), precioTotal: 300, precioBruto: 5646, idProveedor: 1, nombreProveedor: "Cocacola"}

  listaPedidos: Pedido[] = [
    { id: 1, fecha: new Date(2023, 0, 10), precioTotal: 300, precioBruto: 5646, idProveedor: 1, nombreProveedor: "Coca-Cola" },
    { id: 2, fecha: new Date(2023, 1, 15), precioTotal: 450, precioBruto: 6820, idProveedor: 2, nombreProveedor: "Pepsi" },
    { id: 3, fecha: new Date(2023, 2, 20), precioTotal: 520, precioBruto: 7200, idProveedor: 3, nombreProveedor: "Nestlé" },
    { id: 4, fecha: new Date(2023, 3, 25), precioTotal: 280, precioBruto: 4900, idProveedor: 4, nombreProveedor: "Danone" },
    { id: 5, fecha: new Date(2023, 4, 30), precioTotal: 600, precioBruto: 7500, idProveedor: 5, nombreProveedor: "Heineken" },
    { id: 6, fecha: new Date(2023, 5, 5), precioTotal: 390, precioBruto: 6500, idProveedor: 6, nombreProveedor: "Red Bull" },
    { id: 7, fecha: new Date(2023, 6, 10), precioTotal: 410, precioBruto: 6600, idProveedor: 7, nombreProveedor: "Monster" },
    { id: 8, fecha: new Date(2023, 7, 15), precioTotal: 550, precioBruto: 7400, idProveedor: 8, nombreProveedor: "Fanta" },
    { id: 9, fecha: new Date(2023, 8, 20), precioTotal: 320, precioBruto: 5800, idProveedor: 9, nombreProveedor: "Sprite" },
    { id: 10, fecha: new Date(2023, 9, 25), precioTotal: 480, precioBruto: 7000, idProveedor: 10, nombreProveedor: "Aquafina" },

    { id: 11, fecha: new Date(2024, 3, 5), precioTotal: 820, precioBruto: 8700, idProveedor: 11, nombreProveedor: "LG" },
    { id: 12, fecha: new Date(2024, 4, 8), precioTotal: 600, precioBruto: 6200, idProveedor: 12, nombreProveedor: "Panasonic" },
    { id: 13, fecha: new Date(2024, 5, 11), precioTotal: 980, precioBruto: 10300, idProveedor: 13, nombreProveedor: "Microsoft" },
    { id: 14, fecha: new Date(2024, 6, 15), precioTotal: 720, precioBruto: 7500, idProveedor: 14, nombreProveedor: "Amazon" },
    { id: 15, fecha: new Date(2024, 7, 19), precioTotal: 1100, precioBruto: 11800, idProveedor: 15, nombreProveedor: "Google" },
    { id: 16, fecha: new Date(2024, 8, 23), precioTotal: 550, precioBruto: 5700, idProveedor: 16, nombreProveedor: "Huawei" },
    { id: 17, fecha: new Date(2024, 9, 27), precioTotal: 1300, precioBruto: 13500, idProveedor: 17, nombreProveedor: "Xiaomi" },
    { id: 18, fecha: new Date(2024, 10, 30), precioTotal: 980, precioBruto: 10200, idProveedor: 18, nombreProveedor: "Lenovo" },
    { id: 19, fecha: new Date(2024, 11, 4), precioTotal: 870, precioBruto: 9100, idProveedor: 19, nombreProveedor: "Acer" },
    { id: 20, fecha: new Date(2025, 0, 10), precioTotal: 760, precioBruto: 7800, idProveedor: 20, nombreProveedor: "Asus" }
  ];


  listadoPedidos(): Pedido[]{
    return this.listaPedidos
  }

  pedidoId(id): Pedido{
    let ped
    this.listaPedidos.forEach(element => {
      if (element.id == id){
        ped = element
      }
    });
    return ped;
  }
}
