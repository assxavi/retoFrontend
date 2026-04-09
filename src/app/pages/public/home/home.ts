import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { Evento } from '../../../models/evento.model';
import { EventoService } from '../../../core/services/evento.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [FooterComponent, DatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

    eventos: Evento[] = [];
    cargando: boolean = true;
  
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
        descripcion: 'Una noche apasionada de tango en la que podrás disfrutar de la elegancia, la intensidad y la emoción de este baile único, interpretado por algunos de los mejores bailarines de la región. Un evento especial lleno de música, sentimiento y espectáculo, ideal tanto para amantes del tango como para quienes desean vivir una experiencia inolvidable.',
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
