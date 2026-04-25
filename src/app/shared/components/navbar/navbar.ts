import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  menuAbierto = false;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  get username(): string {
    return localStorage.getItem('username') || 'Invitado';
  }

  get rol(): string {
    return localStorage.getItem('rol') || '';
  }

  get isAdmin(): boolean {
    return this.rol === 'ROLE_ADMON';
  }

  logout(): void {
    this.authService.logout();
    this.cerrarMenu();
    this.router.navigate(['/login']);
  }
}