import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TablaColumna {
  campo: string;
  label: string;
}

export interface TablaAcciones {
  verDetalle?: boolean;
  editar?: boolean;
  cancelar?: boolean;
  eliminar?: boolean;
  reservar?: boolean;
}

@Component({
  selector: 'app-tabla',
  imports: [],
  templateUrl: './tabla.html',
  styleUrl: './tabla.scss',
})
export class Tabla {
  @Input() columnas: TablaColumna[] = [];
  @Input() datos: any[] = [];
  @Input() acciones: TablaAcciones = {};
  @Input() tamanoPagina: number = 5;

  @Output() verDetalle = new EventEmitter<any>();
  @Output() editar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();
  @Output() reservar = new EventEmitter<any>();

  paginaActual = 0;
  datosPagina: any[] = [];
  paginas: number[] = [];

  ngOnChanges(): void {
    this.paginaActual = 0;
    this.calcularPaginas();
    this.actualizarPagina();
  }

  calcularPaginas(): void {
    const total = Math.ceil(this.datos.length / this.tamanoPagina);
    this.paginas = Array.from({ length: total }, (_, i) => i);
  }

  actualizarPagina(): void {
    const inicio = this.paginaActual * this.tamanoPagina;
    const fin = inicio + this.tamanoPagina;
    this.datosPagina = this.datos.slice(inicio, fin);
  }

  irAPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarPagina();
  }

  tieneAcciones(): boolean {
    return Object.values(this.acciones).some((v) => v === true);
  }
}
