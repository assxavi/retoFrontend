import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  getMisReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/misReservas`);
  }

  reservar(id: number, cantidad: number): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl}/reservar/${id}`, { cantidad });
  }

  cancelar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cancelar/${id}`);
  }
}