import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input() titulo: string = '';
  @Input() visible: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
}
