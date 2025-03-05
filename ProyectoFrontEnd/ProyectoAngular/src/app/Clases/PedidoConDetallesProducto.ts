import { Pedido } from "./pedido";
import { Producto } from "./producto";
import { DetallesPedidos } from "./detalles-pedido";

export interface PedidoConDetallesProducto {
    pedido: Pedido
    listaProductos: DetallesPedidos[]
}
