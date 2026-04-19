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
      next: () => {
        // Si la llamada tiene éxito, las credenciales son correctas
        // De momento el rol lo hardcodeamos, luego lo traeremos del back
        this.authService.guardarCredenciales(this.username, this.password, 'ROLE_ADMON');

        const rol = localStorage.getItem('rol');
        if (rol === 'ROLE_ADMON') {
          this.router.navigate(['/admin/eventos']);
        } else {
          this.router.navigate(['/eventos']);
        }
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
      },
    });
  }
}
