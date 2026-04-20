import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton',
  imports: [],
  templateUrl: './boton.html',
  styleUrl: './boton.scss',
})
export class Boton {
  @Input() texto: string = '';
  @Input() icono?: string;
  @Input() tipo: 'button' | 'submit' = 'button';
  @Input() variante: 'primario' | 'secundario' | 'peligro' = 'primario';
  @Output() click = new EventEmitter<void>();
}
