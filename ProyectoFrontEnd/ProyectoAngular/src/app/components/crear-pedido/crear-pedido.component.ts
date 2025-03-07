import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule, MatCardXlImage} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PedidoConDetallesProducto } from '../../Clases/PedidoConDetallesProducto';
import { HttpErrorResponse } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Proveedor } from '../../Clases/proveedor';
import { ProveedoresService } from '../../services/proveedores/proveedores.service';
import { Categoria } from '../../Clases/categoria';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../Clases/producto';
import { ProductosService } from '../../services/productos/productos.service';
import { DetallesPedidos } from '../../Clases/detalles-pedido';
import { Pedido } from '../../Clases/pedido';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import {MatSelectModule} from '@angular/material/select';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-crear-pedido',
  imports: [MatCardModule, CommonModule, MatListModule, MatIconModule, FormsModule, MatButton, MatSelectModule, MatIconButton],
  templateUrl: './crear-pedido.component.html',
  styleUrl: './crear-pedido.component.scss'
})
export class CrearPedidoComponent implements OnInit{
  nuevoPedido: PedidoConDetallesProducto
  categoriasExisten: boolean = false

  listaProveedores: Proveedor[]
  listaCategoriasProveedor: Categoria[]
  listaProductos: Producto[]
  
  proveedorSeleccionado: Proveedor = {idProveedores: 0, email: '', nombre: '', direccion: ''}
  categoriaSeleccionada: Categoria = {idCategorias: 0, nombre: ''}
  listaProductosSeleccionados: Producto[] = []
  listaDetallesPedido : DetallesPedidos[] = []
  pedidoMandar: PedidoConDetallesProducto

  constructor(private proveedoresService: ProveedoresService, private productosService: ProductosService, private pedidosService: PedidosService, private router: Router){}

  obtenerProveedores(): void{
    this.proveedoresService.getProveedores().subscribe({
      next:(response) =>{ 
        this.listaProveedores = response;
      },
      error: (error: HttpErrorResponse) =>{ 
        if(error.status == 404){
          //TODO hacer algo
        }
        else {
          alert("Ha ocurrido un error al obtener los datos del servidor");   
        }
      },
    });
  }


  obtenerCategoriasProveedor(): void{
    this.proveedoresService.getCategoriasProveedor(this.proveedorSeleccionado.idProveedores).subscribe({
      next:(response) =>{ 
        this.listaCategoriasProveedor = response;
        this.categoriasExisten = true
      },
      error: (error: HttpErrorResponse) =>{ 
        if(error.status == 404){
          //TODO hacer algo
        }
        else {
          alert("Ha ocurrido un error al obtener los datos del servidor");   
        }
      },
    });
  }

  obtenerProductos():void{
    if (this.categoriaSeleccionada == null || this.categoriaSeleccionada.idCategorias == 0){
      this.productosService.getProductosProveedor(this.proveedorSeleccionado.idProveedores).subscribe({
        next:(response) =>{ 
          this.listaProductos = response;
        },
        error: (error: HttpErrorResponse) =>{ 
          if(error.status == 404){
            //TODO hacer algo
          }
          else {
            alert("Ha ocurrido un error al obtener los datos del servidor");   
          }
        },
      });
    }
    else{
      this.productosService.getProductoProveedoresCategoria(this.proveedorSeleccionado.idProveedores, this.categoriaSeleccionada.idCategorias).subscribe({
        next:(response) =>{ 
          this.listaProductos = response;
        },
        error: (error: HttpErrorResponse) =>{ 
          if(error.status == 404){
            //TODO hacer algo
          }
          else {
            alert("Ha ocurrido un error al obtener los datos del servidor");   
          }
        },
      });
    }
  }

  addProducto(producto):void{
    let nuevoP: DetallesPedidos = {idProducto: producto.idProducto, cantidad: 1, nombreProducto: producto.nombre, 
                                    precioUnidad: producto.precioUnitario, precioTotal: producto.precioUnitario}
    console.log(nuevoP)
    let p = this.listaDetallesPedido.find(x => x.idProducto === producto.idProducto)

    if (p == null){
      this.listaDetallesPedido.push(nuevoP)
    }
    else{
      p.cantidad++;
      p.precioTotal += p.precioUnidad
    }
  }

  crearPedido(): void{
    let pedido: Pedido = {nombreProveedor: this.proveedorSeleccionado.nombre, idProveedor: this.proveedorSeleccionado.idProveedores}
    this.pedidoMandar = {pedido: pedido, listaProductos: this.listaDetallesPedido}

    this.pedidosService.postPedido(this.pedidoMandar).subscribe({
      next:(response) =>{ 
        let pedidoCreado = response;
        alert("Pedido creado correctamente")
        this.router.navigate(['pedidos']);
      },
      error: (error: HttpErrorResponse) =>{ 
        if(error.status == 404){
          //TODO hacer algo
        }
        else {
          alert("Ha ocurrido un error al obtener los datos del servidor");   
        }
      },
    });
  }

  onProveedorChange(): void {
    console.log(this.proveedorSeleccionado)
    this.obtenerCategoriasProveedor();
    this.obtenerProductos()
  }

  onCategoriaChange(): void {
    this.obtenerProductos()
  }

  ngOnInit(): void {
    this.obtenerProveedores()
  }
}
