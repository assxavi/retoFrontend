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
    this.eventos = [];
  }
}
