import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { LayoutComponent } from '../layout/layout.component';
import { Pedidos } from '../../Clases/pedidos';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { NgFor, CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-pedidos',
  imports: [LayoutComponent, MatButtonModule, CommonModule, MatTableModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {
  listadoPedidos: Pedidos[];
  displayedColumns: String[] = ["id", "fecha", "precioTotal", "precioBruto",  "idProveedor"]

  constructor(private pedidosServicio: PedidosService){ }

  obtenerPedidos(){
    this.listadoPedidos = this.pedidosServicio.listadoPedidos()
  }

  ngOnInit(): void {    
    this.obtenerPedidos(); 
  }
}
