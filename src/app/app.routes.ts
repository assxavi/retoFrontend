import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/public/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/public/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/public/registro/registro').then((m) => m.RegistroComponent),
  },
  {
    path: 'eventos',
    loadComponent: () => import('./pages/public/eventos/eventos').then((m) => m.EventosComponent),
  },
  {
    path: 'eventos/detalle/:id',
    loadComponent: () =>
      import('./pages/cliente/detalle-evento/detalle-evento').then((m) => m.DetalleEventoComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/public/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'clientes',
    canActivate: [authGuard],
    children: [
      {
        path: 'mis-reservas',
        loadComponent: () =>
          import('./pages/cliente/mis-reservas/mis-reservas').then((m) => m.MisReservasComponent),
      },
      {
        path:'eventos',
        loadComponent: () =>
          import('./pages/cliente/eventos-cliente/eventos-cliente').then(
            (m) => m.EventosClienteComponent,
          ),
      },  
      {
        path: 'eventos/activos',
        loadComponent: () =>
          import('./pages/cliente/eventos-cliente/eventos-cliente').then(
            (m) => m.EventosClienteComponent,
          ),
      },
      {
        path: 'eventos/cancelados',
        loadComponent: () =>
          import('./pages/cliente/eventos-cliente/eventos-cliente').then(
            (m) => m.EventosClienteComponent,
          ),
      },
      {
        path: 'eventos/terminados',
        loadComponent: () =>
          import('./pages/cliente/eventos-cliente/eventos-cliente').then(
            (m) => m.EventosClienteComponent,
          ),
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: 'eventos',
        loadComponent: () =>
          import('./pages/admin/gestion-eventos/gestion-eventos').then(
            (m) => m.GestionEventosComponent,
          ),
      },
      {
        path: 'eventos/activos',
        loadComponent: () =>
          import('./pages/admin/gestion-eventos/gestion-eventos').then(
            (m) => m.GestionEventosComponent,
          ),
      },
      {
        path: 'eventos/cancelados',
        loadComponent: () =>
          import('./pages/admin/gestion-eventos/gestion-eventos').then(
            (m) => m.GestionEventosComponent,
          ),
      },
      {
        path: 'eventos/terminados',
        loadComponent: () =>
          import('./pages/admin/gestion-eventos/gestion-eventos').then(
            (m) => m.GestionEventosComponent,
          ),
      },
      {
        path: 'eventos/desactivados',
        loadComponent: () =>
          import('./pages/admin/gestion-eventos/gestion-eventos').then(
            (m) => m.GestionEventosComponent,
          ),
      },
      {
        path: 'eventos/nuevo',
        loadComponent: () =>
          import('./pages/admin/form-evento/form-evento').then((m) => m.FormEventoComponent),
      },
      {
        path: 'eventos/editar/:id',
        loadComponent: () =>
          import('./pages/admin/form-evento/form-evento').then((m) => m.FormEventoComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
