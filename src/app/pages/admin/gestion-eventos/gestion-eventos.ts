import { Component, inject } from '@angular/core';
import { BarraLateral } from '../../../shared/components/barra-lateral/barra_lateral';
import { Tabla } from '../../../shared/components/tabla/tabla';
import { Boton } from '../../../shared/components/boton/boton';
import { Modal } from '../../../shared/components/modal/modal';
import { FormEventoComponent } from '../form-evento/form-evento';
import { EventoService } from '../../../core/services/evento.service';
import { Evento } from '../../../models/evento.model';
import { DetalleEventoComponent } from '../../cliente/detalle-evento/detalle-evento';
import { DetalleEventoAdminComponent } from '../detalle-evento/detalle-evento-admin';

@Component({
  selector: 'app-gestion-eventos',
  imports: [BarraLateral, Tabla, Boton, Modal, FormEventoComponent, DetalleEventoAdminComponent],
  templateUrl: './gestion-eventos.html',
  styleUrl: './gestion-eventos.scss',
})
export class GestionEventosComponent {
  private eventoService = inject(EventoService);
  modalVisible = false;
  eventoSeleccionado: Evento | null = null;
  eventoDetalle: Evento | null = null;
  modalDetalleVisible = false;

  eventos: Evento[] = [];
  ngOnInit(): void {
    console.log(this.cargarListado());
    this.cargarListado();
  }

  cargarListado(): void {
    this.eventoService.getListado().subscribe({
      next: (datos) => (this.eventos = datos),
      error: (err) => console.error('Error al cargar eventos:', err),
    });
  }

  onVerDetalle(evento: Evento): void {
    this.eventoDetalle = evento;
    this.modalDetalleVisible = true;
  }

  onEditar(evento: any) {
    this.eventoSeleccionado = evento;
    this.modalVisible = true;
  }
  onCancelar(evento: Evento): void {
    this.eventoService.cancelar(evento.idEvento).subscribe({
      next: () => this.cargarListado(),
      error: (err) => console.error('Error al cancelar evento:', err),
    });
  }
  onEliminar(evento: any) {
    console.log('Eliminar:', evento);
  }

  onGuardarEvento(datos: any): void {
    if (this.eventoSeleccionado) {
      const eventoActualizado = {
        ...datos,
        idEvento: this.eventoSeleccionado.idEvento,
      };
      this.eventoService.editar(this.eventoSeleccionado.idEvento, eventoActualizado).subscribe({
        next: () => {
          this.modalVisible = false;
          this.eventoSeleccionado = null;
          this.cargarListado();
        },
        error: (err) => console.error('Error al editar evento:', err),
      });
    } else {
      this.eventoService.crear(datos).subscribe({
        next: () => {
          this.modalVisible = false;
          this.cargarListado();
        },
        error: (err) => console.error('Error al crear evento:', err),
      });
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.eventoSeleccionado = null;
  }
}
