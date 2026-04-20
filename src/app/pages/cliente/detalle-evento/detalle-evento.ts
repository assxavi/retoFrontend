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
  plazasLibres: number = 45; // Simulación de plazas libres

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private router: Router,
  ) {}

  cargarEvento(id: number): void {
    this.evento = {
      idEvento: id,
      nombre: 'Tango Argentino',
      descripcion:
        'Una noche apasionada de tango con los mejores bailarines de la región. Ven a disfrutar de la música y el baile en un ambiente único.',
      fechaInicio: new Date('2026-04-15'),
      duracion: 120,
      direccion: 'Salón Gran Vía, Logroño',
      estado: 'ACTIVO',
      destacado: 'S',
      aforoMaximo: 50,
      minimoAsistencia: 10,
      precio: 25,
      idTipo: 1,
    };
    this.cargando = false;
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
    console.log(`Reservando ${this.cantidad} plazas para el evento ${this.evento?.nombre}`);
  }
}

