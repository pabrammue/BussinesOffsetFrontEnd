import { Producto } from "./producto"
import { Proveedor } from "./proveedor"

export interface PedidosConProductosYProveedores {
    id:number
    fecha:Date
    precioTotal:number
    precioBruto:number
    proveedorSeleccionado:number
    listaProveedores:Proveedor[]
    listaProductos:Producto[]
}
