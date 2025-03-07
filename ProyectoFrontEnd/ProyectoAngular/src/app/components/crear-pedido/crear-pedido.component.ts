import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule, MatCardXlImage} from '@angular/material/card';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { Pedido } from '../../Clases/pedido';
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

@Component({
  selector: 'app-crear-pedido',
  imports: [MatCardModule, CommonModule, MatListModule, MatIconModule, FormsModule],
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

  constructor(private proveedoresService: ProveedoresService){}

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

  onProveedorChange(): void {
    //alert(this.proveedorSeleccionado.idProveedores)
    this.obtenerCategoriasProveedor();
  }

  onCategoriaChange(): void {
    //alert(this.categoriaSeleccionada.idCategorias)
    //TODO mostrarProductos
  }

  ngOnInit(): void {
    this.obtenerProveedores()
  }
}
