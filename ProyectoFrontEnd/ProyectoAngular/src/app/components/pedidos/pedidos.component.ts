import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-pedidos',
  imports: [LayoutComponent, MatButtonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {

}
