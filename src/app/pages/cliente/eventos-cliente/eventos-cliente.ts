import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BarraLateral } from '../../../shared/components/barra-lateral/barra_lateral';
import { Tabla } from '../../../shared/components/tabla/tabla';
import { EventoService } from '../../../core/services/evento.service';
import { ReservaService } from '../../../core/services/reserva.service';
import { Evento } from '../../../models/evento.model';

@Component({
  selector: 'app-eventos-cliente',
  imports: [CommonModule, BarraLateral, Tabla],
  templateUrl: './eventos-cliente.html',
  styleUrl: './eventos-cliente.scss',
})
export class EventosClienteComponent implements OnInit {
  private eventoService = inject(EventoService);
  private reservaService = inject(ReservaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];

  ngOnInit(): void {
    // Escuchamos cambios en la ruta para filtrar
    this.route.url.subscribe(() => {
      this.cargarEventos();
    });
  }

  cargarEventos() {
    const urlSegments = this.router.url.split('/');
    const status = urlSegments[urlSegments.length - 1];

    let request;
    if (status === 'cancelados') {
      request = this.eventoService.getCancelados();
    } else if (status === 'terminados') {
      request = this.eventoService.getTerminados();
    } else {
      request = this.eventoService.getActivos();
    }

    request.subscribe({
      next: (datos) => {
        this.eventos = datos;
        this.eventosFiltrados = datos; // Ya vienen filtrados del backend por el endpoint
      },
      error: (err) => console.error('Error al cargar eventos:', err),
    });
  }

  filtrarEventos() {
    // Ya no es necesario filtrar de forma manual si llamamos al endpoint específico
  }

  onCancelar(evento: any) {
    console.log('Cancelar:', evento);
  }

  onVerDetalle(evento: any) {
    this.router.navigate(['/clientes/detalle', evento.idEvento]);
  }

  onReservar(evento: any) {
    this.reservaService.reservar(evento.idEvento, 1).subscribe({
      next: () => {
        alert('¡Reserva realizada con éxito!');
        this.router.navigate(['/clientes/misReservas']);
      },
      error: (err) => console.error('Error al reservar:', err),
    });
  }
}
