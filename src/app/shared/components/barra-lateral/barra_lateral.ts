import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarLink {
  label: string;
  route: string;
  icon?: string; // clase de FontAwesome, ej: 'fa-calendar'
}

@Component({
  selector: 'app-barra-lateral',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './barra_lateral.html',
  styleUrl: './barra_lateral.scss',
})
export class BarraLateral {
  @Input() title: string = '';
  @Input() links: SidebarLink[] = [];
}
