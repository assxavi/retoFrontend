import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../../models/reserva.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient) {}

  getMisReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/misReservas`);
  }

  reservar(id: number, cantidad: number): Observable<string> {
    return this.http.post(`${this.apiUrl}/reservar/${id}?cantidad=${cantidad}`, {}, { responseType: 'text' });
  }

  cancelar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cancelar/${id}`);
  }
}