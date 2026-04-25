import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const rol = localStorage.getItem('rol');

  if (authService.isLoggedIn() && rol === 'ROLE_ADMON') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};