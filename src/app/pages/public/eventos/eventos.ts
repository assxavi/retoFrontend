import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventoService } from '../../../core/services/evento.service';
import { Evento } from '../../../models/evento.model';

@Component({
  selector: 'app-eventos',
  imports: [CommonModule, RouterLink],
  templateUrl: './eventos.html',
  styleUrl: './eventos.scss'
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
  this.cargando = false;
  this.eventos = [
    {
      idEvento: 1,
      nombre: 'Tango Argentino',
      descripcion: 'Una noche apasionada de tango con los mejores bailarines de la región.',
      fechaInicio: new Date('2026-04-15'),
      duracion: 120,
      direccion: 'Salón Gran Vía, Logroño',
      estado: 'ACTIVO',
      destacado: 'S',
      aforoMaximo: 50,
      minimoAsistencia: 10,
      precioVenta: 25,
      idTipo: 1
    },
    {
      idEvento: 2,
      nombre: 'Salsa Cubana',
      descripcion: 'Aprende los movimientos más sensuales de la salsa cubana.',
      fechaInicio: new Date('2026-04-22'),
      duracion: 90,
      direccion: 'Centro Cultural, Logroño',
      estado: 'ACTIVO',
      destacado: 'S',
      aforoMaximo: 40,
      minimoAsistencia: 8,
      precioVenta: 20,
      idTipo: 1
    },
    {
      idEvento: 3,
      nombre: 'Vals Vienés',
      descripcion: 'Elegancia y sofisticación en una velada de vals clásico.',
      fechaInicio: new Date('2026-05-01'),
      duracion: 150,
      direccion: 'Hotel Marqués, Logroño',
      estado: 'ACTIVO',
      destacado: 'N',
      aforoMaximo: 60,
      minimoAsistencia: 15,
      precioVenta: 35,
      idTipo: 2
    }
  ];
}
}