import { Component, Inject } from '@angular/core';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-cancelar-pedido',
  imports: [MatButtonModule],
  templateUrl: './dialog-cancelar-pedido.component.html',
  styleUrl: './dialog-cancelar-pedido.component.scss'
})

export class DialogCancelarPedidoComponent {
  pedidoId: number

  constructor(private pedidosServicio: PedidosService,
        public dialog: MatDialogRef<number>,
        @Inject(MAT_DIALOG_DATA) public data: number
      ) {
        this.pedidoId = data;
      } 

    cancelarPedido() {
      let borradoCorrectamente: Boolean
      this.pedidosServicio.cancelarPedido(this.pedidoId).subscribe({
        next:(response) =>{ 
          borradoCorrectamente = response; 
  
          if (borradoCorrectamente){
            this.dialog.close(true)
          }
        },
        error: (error: HttpErrorResponse) =>{ 
          if(error.status == 404){
            alert("No se ha podido borrar, intentalo más tarde")
            this.dialog.close(false)
          }
          else {
            alert("Ha ocurrido un error al obtener los datos del servidor");   
          }
        },
      });
    }
}
