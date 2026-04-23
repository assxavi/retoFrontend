import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipo } from '../../models/tipo.model';

@Injectable({
  providedIn: 'root',
})
export class TipoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/tipos';

  findAll(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.apiUrl}/listado`);
  }
}