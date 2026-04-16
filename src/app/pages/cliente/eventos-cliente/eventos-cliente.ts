import { Component } from '@angular/core';
import { BarraLateral } from '../../../shared/components/barra-lateral/barra_lateral';
import { Tabla } from '../../../shared/components/tabla/tabla';

@Component({
  selector: 'app-gestion-eventos',
  imports: [BarraLateral, Tabla],
  templateUrl: './eventos-cliente.html',
  styleUrl: './eventos-cliente.scss',
})
export class EventosClienteComponent {

    eventos = [
    { id: 1, nombre: 'Salsa en la Plaza', fecha: '15/06/2025', aforo: 120, precio: '25€' },
    { id: 2, nombre: 'Tango Noche de Verano', fecha: '22/06/2025', aforo: 80, precio: '35€' },
    { id: 3, nombre: 'Bachata Sunset', fecha: '29/06/2025', aforo: 100, precio: '20€' },
    { id: 4, nombre: 'Vals Clásico', fecha: '05/07/2025', aforo: 60, precio: '40€' },
    { id: 5, nombre: 'Cumbia en la Costa', fecha: '12/07/2025', aforo: 150, precio: '15€' },
  ];

  onCancelar(evento: any) {
    console.log('Cancelar:', evento);
  }
  onVerDetalle(evento: any) {
    console.log('Ver detalle:', evento);
  }

  onReservar(evento: any) {
    console.log('Reservar:', evento);
  }
}
