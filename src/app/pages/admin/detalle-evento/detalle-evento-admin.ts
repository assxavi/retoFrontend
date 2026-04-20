import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Evento } from '../../../models/evento.model';

@Component({
  selector: 'app-detalle-evento-admin',
  imports: [CommonModule],
  templateUrl: './detalle-evento-admin.html',
  styleUrl: './detalle-evento-admin.scss',
})
export class DetalleEventoAdminComponent {
  @Input() evento!: Evento;
}
