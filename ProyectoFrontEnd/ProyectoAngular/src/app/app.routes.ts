import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaginaEnConstruccionComponent } from './components/pagina-en-construccion/pagina-en-construccion.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'construccion', component: PaginaEnConstruccionComponent
    }
];
