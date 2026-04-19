import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventoService } from '../../../core/services/evento.service';
import { ReservaService } from '../../../core/services/reserva.service';
import { AuthService } from '../../../core/services/auth.service';
import { Evento } from '../../../models/evento.model';

@Component({
  selector: 'app-detalle-evento',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './detalle-evento.html',
  styleUrl: './detalle-evento.scss',
})
export class DetalleEventoComponent implements OnInit {
  evento: Evento | null = null;
  cantidad: number = 1;
  cargando: boolean = true;
  mensaje: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarEvento(Number(id));
    }
  }

  cargarEvento(id: number): void {
    this.cargando = false;
  }

  reservar(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.cantidad < 1 || this.cantidad > 10) {
      this.error = 'La cantidad debe ser entre 1 y 10';
      return;
    }

    this.reservaService.reservar(this.evento!.idEvento, this.cantidad).subscribe({
      next: () => {
        this.mensaje = 'Reserva realizada con éxito';
        this.error = '';
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al realizar la reserva';
        this.mensaje = '';
      },
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
