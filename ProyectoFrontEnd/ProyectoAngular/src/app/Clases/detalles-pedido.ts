export interface DetallesPedidos {
    idDetalles?: number;
    idPedido?: number;
    idProducto: number;
    cantidad: number;
    precioBruto?: number;
    cuotaIva?: number;
    precioTotal?: number;
    idProveedor?: number;
    nombreProducto: string;
    precioUnidad?: number;
    porcentajeIVA?: number;
}