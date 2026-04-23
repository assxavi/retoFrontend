import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipo } from '../../models/tipo.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class TipoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/eventos`;

  findAll(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.apiUrl}/listado`);
  }
}