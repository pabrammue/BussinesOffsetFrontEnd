import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PedidoConDetallesProducto } from '../../../Clases/PedidoConDetallesProducto';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dialog-crear-pedido',
  imports: [CommonModule, MatList, MatListItem, MatButton],
  templateUrl: './dialog-crear-pedido.component.html',
  styleUrl: './dialog-crear-pedido.component.scss'
})
export class DialogCrearPedidoComponent {
  pedidoMandar: PedidoConDetallesProducto
  precioTotal: number

  constructor(
    private pedidosService: PedidosService,
    public dialog: MatDialogRef<PedidoConDetallesProducto>,
    @Inject(MAT_DIALOG_DATA) public data: PedidoConDetallesProducto
  ) {
    this.pedidoMandar = data;
    this.precioTotal = this.calcularPrecioTotal()
  } 


    /**
     * Método que hace una llamada a la api (post) para crear un nuevo pedido en la base de datos
     */
    crearPedido(): void{
      this.pedidosService.postPedido(this.pedidoMandar).subscribe({
        next:(response) =>{ 
          let pedidoCreado = response;
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
      this.dialog.close(true)
    }

    calcularPrecioTotal(): number{
      let precio = 0
      this.pedidoMandar.listaProductos.forEach(element => {
        precio += element.precioTotal
      });
      return precio
    }
}
