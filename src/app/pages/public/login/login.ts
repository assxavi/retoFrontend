import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        // Guardamos las credenciales base
        this.authService.guardarCredenciales(this.username, this.password, '');

        // Recuperamos la info completa del usuario para el rol
        this.authService.getUsuarioInfo(this.username).subscribe({
          next: (usuario) => {
            const perfiles = usuario.perfiles || [];
            console.log('Perfiles detectados:', perfiles);

            const isAdmin = perfiles.some((p: any) => {
              const nombre = (p.perfil?.nombre || p.nombre || '').toUpperCase();
              console.log('Comprobando perfil:', nombre);
              return nombre.includes('ADMON') || nombre.includes('ADMIN');
            });

            console.log('¿Es Admin?:', isAdmin);
            const rolReal = isAdmin ? 'ROLE_ADMON' : 'ROLE_CLIENTE';
            console.log('Asignando Rol Real:', rolReal);
            
            this.authService.guardarCredenciales(this.username, this.password, rolReal);

            if (isAdmin) {
              this.router.navigate(['/admin/eventos']);
            } else {
              this.router.navigate(['/clientes/misReservas']);
            }
          },
          error: (err) => {
            console.error('Error al obtener info del usuario:', err);
            // Por seguridad, si falla el detalle pero el login fue OK (401 arriba), 
            // intentamos entrar como cliente.
            this.authService.guardarCredenciales(this.username, this.password, 'ROLE_CLIENTE');
            this.router.navigate(['/clientes/misReservas']);
          }
        });
      },
      error: (err) => {
        console.error('Error de login:', err);
        if (err.status === 401) {
          this.error = 'Usuario o contraseña incorrectos';
        } else {
          this.error = 'Error de conexión con el servidor';
        }
      }
    });
  }
}
