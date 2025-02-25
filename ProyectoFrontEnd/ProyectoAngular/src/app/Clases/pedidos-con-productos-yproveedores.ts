import { Productos } from "./productos"
import { Proveedores } from "./proveedores"

export interface PedidosConProductosYProveedores {
    id:number
    fecha:Date
    precioTotal:number
    precioBruto:number
    proveedorSeleccionado:number
    listaProveedores:Proveedores[]
    listaProductos:Productos[]
}
