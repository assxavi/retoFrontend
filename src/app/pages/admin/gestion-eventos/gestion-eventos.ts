import { Component, inject, OnInit } from '@angular/core';
import { BarraLateral } from '../../../shared/components/barra-lateral/barra_lateral';
import { Tabla } from '../../../shared/components/tabla/tabla';
import { Boton } from '../../../shared/components/boton/boton';
import { Modal } from '../../../shared/components/modal/modal';
import { FormEventoComponent } from '../form-evento/form-evento';
import { EventoService } from '../../../core/services/evento.service';
import { Evento } from '../../../models/evento.model';
import { DetalleEventoComponent } from '../../cliente/detalle-evento/detalle-evento';
import { DetalleEventoAdminComponent } from '../detalle-evento/detalle-evento-admin';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-eventos',
  imports: [BarraLateral, Tabla, Boton, Modal, FormEventoComponent, DetalleEventoAdminComponent],
  templateUrl: './gestion-eventos.html',
  styleUrl: './gestion-eventos.scss',
})
export class GestionEventosComponent {
  private eventoService = inject(EventoService);
  private route = inject(ActivatedRoute);
  modalVisible = false;
  eventoSeleccionado: Evento | null = null;
  eventoDetalle: Evento | null = null;
  modalDetalleVisible = false;

  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.cargarListado();
    });
  }

  cargarListado(): void {
    this.eventoService.getListado().subscribe({
      next: (datos) => {
        this.eventos = datos;
        this.filtrarEventos();
      },
      error: (err) => console.error('Error al cargar eventos:', err),
    });
  }

  private filtrarEventos(): void {
    const path = this.route.snapshot.url[this.route.snapshot.url.length - 1]?.path;
    
    if (!path || path === 'eventos') {
      this.eventosFiltrados = this.eventos;
      return;
    }

    const estadoMapa: { [key: string]: string } = {
      'activos': 'ACTIVO',
      'cancelados': 'CANCELADO',
      'terminados': 'TERMINADO',
      'desactivados': 'DESACTIVADO'
    };

    const estadoBuscado = estadoMapa[path];
    if (estadoBuscado) {
      this.eventosFiltrados = this.eventos.filter(e => e.estado === estadoBuscado);
    } else {
      this.eventosFiltrados = this.eventos;
    }
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
  if (confirm("¿Estás seguro de que deseas eliminar el evento \"" + evento.nombre + "\"?")) {
    this.eventoService.eliminar(evento.idEvento).subscribe({
      next: () => {
        this.eventos = this.eventos.filter((e) => e.idEvento !== evento.idEvento);
        this.filtrarEventos();
      },
      error: (err) => {
        // 204 No Content puede llegar como error de parseo, pero la operación fue exitosa
        if (err.status === 200 || err.status === 204) {
          this.eventos = this.eventos.filter((e) => e.idEvento !== evento.idEvento);
          this.filtrarEventos();
        } else {
          console.error('Error al eliminar evento:', err);
        }
      },
    });
  }
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
