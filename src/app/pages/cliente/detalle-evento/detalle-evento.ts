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
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-evento.html',
  styleUrl: './detalle-evento.scss',
})
export class DetalleEventoComponent implements OnInit {
  evento: Evento | null = null;
  cantidad: number = 1;
  cargando: boolean = true;
  mensaje: string = '';
  error: string = '';
  plazasLibres: number = 45; // Simulación de plazas libres

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private router: Router,
  ) {}

  cargarEvento(id: number): void {
    this.cargando = true;
    this.eventoService.getDetalle(id).subscribe({
      next: (evento) => {
        this.evento = evento;
        this.plazasLibres = evento.aforoMaximo; // O la lógica que prefieras para plazas
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar el detalle del evento:', err);
        this.error = 'No se ha podido cargar la información del evento.';
        this.cargando = false;
      }
    });
  }



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if(id){
        this.cargarEvento(id);
      }
    });
  }

  sumarPlazas(): void {
    if (this.cantidad < this.plazasLibres) {
      this.cantidad++;
    }  
  }

  restarPlazas(): void{
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  reservarPlazas(): void {
    if (!this.evento) return;

    this.reservaService.reservar(this.evento.idEvento, this.cantidad).subscribe({
      next: () => {
        alert('¡Reserva realizada con éxito!');
        this.router.navigate(['/clientes/misReservas']);
      },
      error: (err) => {
        console.error('Error al realizar la reserva:', err);
        alert('Hubo un problema al realizar la reserva. Por favor, inténtalo de nuevo.');
      }
    });
  }
}

