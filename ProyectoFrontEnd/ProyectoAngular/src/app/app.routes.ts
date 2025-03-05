import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaginaEnConstruccionComponent } from './components/pagina-en-construccion/pagina-en-construccion.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { DetallesPedidoComponent } from './components/detalles-pedido/detalles-pedido.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, 
    {
        path: '', component: LayoutComponent, //canActivate:[AuthGuard],
        children: 
        [
            { path: '', component: InicioComponent },
            { path: 'pedidos', component: PedidosComponent },
            { path: 'detallesPedidos/:id', component: DetallesPedidoComponent },
            { path: 'construccion', component: PaginaEnConstruccionComponent }
        ]
    }
];
