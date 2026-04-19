import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../../models/evento.model';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/eventos';

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
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
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
}
