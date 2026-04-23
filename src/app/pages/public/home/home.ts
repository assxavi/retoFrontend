import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { Evento } from '../../../models/evento.model';
import { EventoService } from '../../../core/services/evento.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, CommonModule, RouterLink],
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
    this.cargando = true;
    this.eventoService.getActivos().subscribe({
      next: (datos) => {
        this.eventos = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar eventos en Home:', err);
        this.cargando = false;
      },
    });
  }

  getImagenTipo(evento: Evento): string {
    const nombre = evento.tipo?.nombre;
    if (!nombre) return 'assets/img/tipos/vals-lento.jpg'; // imagen por defecto

    const mapa: { [key: string]: string } = {
      'Vals Lento': 'vals-lento',
      Tango: 'tango',
      Foxtrot: 'foxtrot',
      Quickstep: 'quickstep',
      'Vals Vienés': 'vals-vienes',
      'Cha-cha-chá': 'cha-cha-cha',
      Rumba: 'rumba',
      Samba: 'samba',
      Pasodoble: 'pasodoble',
      Jive: 'jive',
      Salsa: 'salsa',
      Bachata: 'bachata',
      Merengue: 'merengue',
    };

    const archivo = mapa[nombre] ?? 'vals-lento';
    return `assets/img/tipos/${archivo}.jpg`;
  }
}
