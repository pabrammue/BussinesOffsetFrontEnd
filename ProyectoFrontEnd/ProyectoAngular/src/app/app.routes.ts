import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaginaEnConstruccionComponent } from './components/pagina-en-construccion/pagina-en-construccion.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // Login sin layout
    {
        path: '',
        component: LayoutComponent, // Encapsula el header y el sidenav
        children: [
            { path: 'construccion', component: PaginaEnConstruccionComponent },
            { path: 'construccion', component: PaginaEnConstruccionComponent },
            { path: '**', redirectTo: 'pedidos' }
        ]
    }
];
