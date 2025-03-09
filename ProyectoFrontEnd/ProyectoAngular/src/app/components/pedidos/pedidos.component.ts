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

    /**
     * Método que hace llamada a la api para obtener todos los pedido no cancelados en la bbdd
     */
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

  /**
   * Método que va a la página de los detalles del pedido en el que se pulsa
   * @param id id del pedido clickado
   */
  abrirDetallesPedido(id): void{
    this.router.navigate(['detallesPedidos', id]);// navegar a otra vista y pasarle el id
  }

  /**
   * Método que redirige a la página de creación de un nuevo pedido
   */
  abrirCrearPedido(): void{
    this.router.navigate(['crearNuevoPedido'])
  }

  /**
   * Método que se ejecuta al iniciar
   */
  ngOnInit(): void {    
    this.obtenerPedidos(); 
  }
}
