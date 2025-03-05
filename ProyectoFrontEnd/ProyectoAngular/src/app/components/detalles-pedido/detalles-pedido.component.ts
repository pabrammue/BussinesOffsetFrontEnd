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

@Component({
  selector: 'app-detalles-pedido',
  imports: [MatCardModule, CommonModule, MatListModule, MatIconModule],
  templateUrl: './detalles-pedido.component.html',
  styleUrl: './detalles-pedido.component.scss'
})
export class DetallesPedidoComponent implements OnInit {
  pedidoId: number | null = null;
  pedido: Pedido
  pedidoDetalles: PedidoConDetallesProducto
  existePedido = true

  constructor(private route: ActivatedRoute, private pedidosServicio: PedidosService,) {}

  obtenerPedido(){
    //this.pedido = this.pedidosServicio.pedidoId(this.pedidoId)
    this.pedidosServicio.getPedidoDetalles(this.pedidoId).subscribe({
          next:(response) =>{ 
            this.pedidoDetalles = response;
          },
          error: (error: HttpErrorResponse) =>{ 
            if(error.status == 404){
              this.existePedido = false;
            }
            else {
              alert("Ha ocurrido un error al obtener los datos del servidor");   
            }
          },
        });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pedidoId = Number(params.get('id'));
      console.log('ID del pedido:', this.pedidoId);
    });
    this.obtenerPedido();
  }
}
