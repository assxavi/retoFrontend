import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateral } from '../../../shared/components/barra-lateral/barra_lateral';
import { Tabla } from '../../../shared/components/tabla/tabla';
import { ReservaService } from '../../../core/services/reserva.service';
import { Reserva } from '../../../models/reserva.model';

@Component({
  selector: 'app-mis-reservas',
  imports: [CommonModule, BarraLateral, Tabla],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.scss',
})
export class MisReservasComponent implements OnInit {
  private reservaService = inject(ReservaService);
  reservas: any[] = [];

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservaService.getMisReservas().subscribe({
      next: (datos) => (this.reservas = datos),
      error: (err) => console.error('Error al cargar reservas:', err),
    });
  }

  onCancelarReserva(reserva: any) {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      this.reservaService.cancelar(reserva.idReserva).subscribe({
        next: () => this.cargarReservas(),
        error: (err) => console.error('Error al cancelar reserva:', err),
      });
    }
  }
}
