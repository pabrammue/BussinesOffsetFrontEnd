import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaginaEnConstruccionComponent } from './components/pagina-en-construccion/pagina-en-construccion.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, 
    {
        path: '', component: LayoutComponent, 
        children: 
        [
            { path: 'pedidos', component: PedidosComponent },
            { path: 'construccion', component: PaginaEnConstruccionComponent }
        ]
    }
];
