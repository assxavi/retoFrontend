# Reserva Entradas - Bailes de Salón
Frontend de la aplicación de reserva de entradas para eventos de bailes de salón.
Desarrollado con Angular 20 como parte del Reto Transversal de 2º DAW (UNIR).

## Tecnologías
- Angular 20
- TypeScript
- SCSS
- Google Fonts (Playfair Display + Inter)

## Requisitos previos
- Node.js v22+
- npm v10+
- Angular CLI v20+

## Instalación y arranque
```bash
git clone https://github.com/assxavi/retoFrontend.git
cd retoFrontend
npm install
ng serve
```
Abrir en el navegador: `http://localhost:4200`

## Estructura del proyecto
```
src/app/
  ├── core/
  │     ├── guards/         # authGuard y adminGuard
  │     ├── interceptors/   # authInterceptor (JWT)
  │     └── services/       # AuthService, EventoService, ReservaService
  ├── models/               # interfaces TypeScript
  ├── pages/
  │     ├── public/         # login, registro, eventos
  │     ├── cliente/        # detalle-evento, mis-reservas
  │     └── admin/          # gestion-eventos, form-evento
  └── shared/
        └── components/     # navbar
```

## Pantallas implementadas
- `/login` → formulario de inicio de sesión
- `/registro` → formulario de registro de nuevo usuario
- `/eventos` → listado de eventos destacados (público)
- `/clientes/detalle/:id` → detalle del evento + formulario de reserva
- `/clientes/misReservas` → listado de reservas del cliente (pendiente)
- `/admin/eventos` → gestión de eventos (pendiente)
- `/admin/eventos/nuevo` → crear evento (pendiente)
- `/admin/eventos/editar/:id` → editar evento (pendiente)

## Roles de usuario
| Rol | Acceso |
|-----|--------|
| Invitado | Eventos públicos y detalle |
| ROLE_CLIENTE | Todo lo anterior + reservas |
| ROLE_ADMON | Todo + gestión de eventos |

## Seguridad
- JWT guardado en localStorage
- `authInterceptor` añade el token en cada petición HTTP
- `authGuard` protege rutas de clientes
- `adminGuard` protege rutas de administración

##  Pendiente conectar con backend
- Descomentar `canActivate: [authGuard]` en `app.routes.ts`
- Eliminar mock data de `eventos.component.ts`
- Eliminar mock data de `detalle-evento.component.ts`
- URL del backend configurada en cada servicio: `http://localhost:8080`

## Ramas
- `main` → código estable
- `develop` → desarrollo activo

## Autores
Yeray — Frontend Developer
Hector Gonzalez Mendez - FullStack Developer
Álvaro Postigo Jiménez - FullStack Developer
Jesus Pastor Ricoy - FullStack Developer
Sofia Fernandez Feijoo - FullStack Developer

## URL RETO
https://reto.alvaropj.com 

