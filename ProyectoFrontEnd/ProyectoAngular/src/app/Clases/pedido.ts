export interface Pedido {
    id:number
    fecha:Date
    precioTotal:number
    precioBruto:number
    idProveedor:number
    aceptado: boolean
    nombreProveedor:string
}
