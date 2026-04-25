import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventoService } from '../../../core/services/evento.service';
import { Evento } from '../../../models/evento.model';

@Component({
  selector: 'app-eventos',
  imports: [CommonModule, RouterLink],
  templateUrl: './eventos.html',
  styleUrl: './eventos.scss',
})
export class EventosComponent implements OnInit {
  eventos: Evento[] = [];
  cargando: boolean = true;
  error: string = '';

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.cargando = true;
    this.eventoService.getActivos().subscribe({
      next: (datos) => {
        this.eventos = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar eventos:', err);
        this.error = 'No se han podido cargar los eventos.';
        this.cargando = false;
      }
    });
  }
}
