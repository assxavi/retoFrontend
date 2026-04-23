import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}`;

  login(username: string, password: string): Observable<any> {
    // Verificamos credenciales llamando a un endpoint protegido
    const credentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`,
    });
    return this.http.get(`${this.apiUrl}/eventos/listado`, { headers });
  }

  guardarCredenciales(username: string, password: string, rol: string): void {
    const credentials = btoa(`${username}:${password}`);
    localStorage.setItem('credentials', credentials);
    localStorage.setItem('username', username);
    localStorage.setItem('rol', rol);
  }

  getCredentials(): string | null {
    return localStorage.getItem('credentials');
  }

  isLoggedIn(): boolean {
    return this.getCredentials() !== null;
  }

  logout(): void {
    localStorage.removeItem('credentials');
    localStorage.removeItem('username');
    localStorage.removeItem('rol');
  }

  registro(datos: any): Observable<any> {
    console.log('Enviando datos de registro:', datos);
    return this.http.post(`${this.apiUrl}/usuarios/alta`, datos);
  }

  getUsuarioInfo(username: string): Observable<any> {
    const credentials = this.getCredentials();
    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`,
    });
    return this.http.get(`${this.apiUrl}/usuarios/detalle/${username}`, { headers });
  }
}
