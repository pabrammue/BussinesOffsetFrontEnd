import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [MatIconModule, MatButtonModule, MatCardModule, CommonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  items = [
    { icon: 'shopping_cart', title: 'Pedidos', ruta: 'pedidos' },
    { icon: 'group', title: 'Clientes', ruta: 'construccion' },
    { icon: 'category', title: 'Productos' },
    { icon: 'account_balance', title: 'Finanzas', ruta: 'construccion' },
    { icon: 'insights', title: 'Datos', ruta: 'construccion' },
    { icon: 'people', title: 'Usuarios', ruta: 'construccion' },
    { icon: 'description', title: 'Reportes', ruta: 'construccion' },
    { icon: 'bar_chart', title: 'Clientes', ruta: 'construccion' }
  ];
}
