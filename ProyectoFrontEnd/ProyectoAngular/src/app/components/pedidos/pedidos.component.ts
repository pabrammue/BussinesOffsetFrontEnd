import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Pedido } from '../../Clases/pedido';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pedidos',
  imports: [MatButtonModule, CommonModule, MatTableModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})


export class PedidosComponent implements OnInit {
  datosEncontrados: Boolean = true
  listadoPedidos: Pedido[];
  displayedColumns: String[] = ["id", "nombreProveedor", "fecha", "precioTotal", "precioBruto"]

  constructor(private pedidosServicio: PedidosService, private router: Router){ }

  obtenerPedidos(): void{
    //this.listadoPedidos = this.pedidosServicio.listadoPedidos()

    this.pedidosServicio.getPedidos().subscribe({
      next:(response) =>{ 
        this.listadoPedidos = response;
      },
      error: (error: HttpErrorResponse) =>{ 
        if(error.status == 404){
          this.datosEncontrados = false
        }
        else {
          alert("Ha ocurrido un error al obtener los datos del servidor");   
        }
      }
    });
  }

  abrirDetallesPedido(id): void{
    this.router.navigate(['detallesPedidos', id]);// navegar a otra vista y pasarle el id
  }

  abrirCrearPedido(): void{
    this.router.navigate(['crearNuevoPedido'])
  }

  ngOnInit(): void {    
    this.obtenerPedidos(); 
  }
}
