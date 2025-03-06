import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; // Ya lo importaste aquí

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule // Añade MatIconModule aquí
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}