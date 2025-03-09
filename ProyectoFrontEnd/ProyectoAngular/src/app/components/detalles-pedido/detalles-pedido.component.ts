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
import { idToken } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCancelarPedidoComponent } from '../dialogs/dialog-cancelar-pedido/dialog-cancelar-pedido.component';

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

  constructor(private route: ActivatedRoute, private pedidosServicio: PedidosService, private router: Router, public dialog: MatDialog) {}

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

  /*deletePedido() {
    if (!confirm("¿Estás seguro de que quieres eliminar este pedido?")) {
      return; // Si el usuario cancela, no hace nada
    }

    let borradoCorrectamente: Boolean
    this.pedidosServicio.cancelarPedido(this.pedidoId).subscribe({
      next:(response) =>{ 
        borradoCorrectamente = response; // Cannot find name 'borradoCorrectamente'

        if (borradoCorrectamente){
          this.router.navigate(['pedidos']);
        }
      },
      error: (error: HttpErrorResponse) =>{ 
        if(error.status == 404){
          alert("No se ha podido borrar, intentalo más tarde")
        }
        else {
          alert("Ha ocurrido un error al obtener los datos del servidor");   
        }
      },
    });
  }*/

  abrirDialogCancelarPedido(){
        let dialogRef = this.dialog.open(DialogCancelarPedidoComponent, {
          panelClass: 'full-width-dialog',
          height: '300px',
          width: '600px',
          data: this.pedidoId
        });
    
        dialogRef.afterClosed().subscribe((result) => { 
          if (result == true){ 
            this.router.navigate(['pedidos']);
          }
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
