import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class RegistroComponent {

  usuario = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    nombre: '',
    apellidos: '',
    direccion: ''
  };

  error: string = '';
  exito: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrar(): void {
    if (this.usuario.password !== this.usuario.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    if (this.usuario.username.length < 4) {
      this.error = 'El usuario debe tener al menos 4 caracteres';
      return;
    }

    const { confirmPassword, ...datosRegistro } = this.usuario;

    this.authService.registro(datosRegistro).subscribe({
      next: () => {
        this.exito = 'Cuenta creada correctamente. Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al crear la cuenta';
      }
    });
  }
}