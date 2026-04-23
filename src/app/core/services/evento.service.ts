import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../../models/evento.model';
import { environment } from '../../../environment.ts';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/eventos`;

  getListado(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/listado`);
  }

  getActivos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/activos`);
  }

  getDestacados(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/destacados`);
  }

  getDetalle(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/detalle/${id}`);
  }

  crear(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.apiUrl}/alta`, evento);
  }

  editar(id: number, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/editar/${id}`, evento);
  }

  cancelar(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/cancelar/${id}`, {});
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  // Endpoints específicos para vista pública e invitado
  getCancelados(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/cancelados`);
  }

  getTerminados(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/terminados`);
  }
}
