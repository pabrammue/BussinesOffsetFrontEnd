import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { Pedido } from '../../Clases/pedido';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-pedido',
  imports: [MatCardModule, CommonModule],
  templateUrl: './detalles-pedido.component.html',
  styleUrl: './detalles-pedido.component.scss'
})
export class DetallesPedidoComponent implements OnInit {
  pedidoId: number | null = null;
  pedido: Pedido
  existePedido = true

  constructor(private route: ActivatedRoute, private pedidosServicio: PedidosService,) {}

  obtenerPedido(){
    this.pedido = this.pedidosServicio.pedidoId(this.pedidoId)

    if (this.pedido == null){
      this.existePedido = false;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pedidoId = Number(params.get('id'));
      console.log('ID del pedido:', this.pedidoId);
    });
    this.obtenerPedido();
  }
}
