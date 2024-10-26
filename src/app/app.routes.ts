import { Routes } from '@angular/router';
import { AppLayoutComponent } from './core/components/app-layout/app-layout.component';
import { HomeComponent } from './features/components/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: 'Register',
        component: RegisterComponent
    },
    {
        path: '',
        component: AppLayoutComponent,
        children:[
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/Home'
            },
            {
                path: 'Home',
                component: HomeComponent
            }
        ]
    }
];
