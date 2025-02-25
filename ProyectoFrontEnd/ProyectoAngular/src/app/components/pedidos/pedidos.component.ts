import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { LayoutComponent } from '../layout/layout.component';
import { Pedido } from '../../Clases/pedido';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { NgFor, CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatHeaderRowDef } from '@angular/material/table';
import { MatRowDef } from '@angular/material/table';

@Component({
  selector: 'app-pedidos',
  imports: [MatButtonModule, CommonModule, MatTableModule, NgFor],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})


export class PedidosComponent implements OnInit {
  listadoPedidos: Pedido[];
  displayedColumns: String[] = ["nombreProveedor", "fecha", "precioTotal", "precioBruto"]

  constructor(private pedidosServicio: PedidosService){ }

  obtenerPedidos(): void{
    this.listadoPedidos = this.pedidosServicio.listadoPedidos()
  }

  ngOnInit(): void {    
    this.obtenerPedidos(); 
  }
}
