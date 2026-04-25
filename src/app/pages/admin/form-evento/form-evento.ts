import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Boton } from '../../../shared/components/boton/boton';
import { Evento } from '../../../models/evento.model';
import { TipoService } from '../../../core/services/tipo.service';
import { Tipo } from '../../../models/tipo.model';

@Component({
  selector: 'app-form-evento',
  imports: [CommonModule, ReactiveFormsModule, Boton],
  templateUrl: './form-evento.html',
  styleUrl: './form-evento.scss',
})
export class FormEventoComponent {
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private tipoService = inject(TipoService);
  tipos: Tipo[] = [];

  constructor() {
    this.tipoService.findAll().subscribe((data) => {
      this.tipos = data;
    });
  }

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    descripcion: ['', Validators.maxLength(200)],
    fechaInicio: ['', Validators.required],
    duracion: [null as number | null, Validators.required],
    direccion: ['', Validators.maxLength(100)],
    estado: ['ACTIVO', Validators.required],
    destacado: ['N'],
    aforoMaximo: [null as number | null, Validators.required],
    minimoAsistencia: [null as number | null],
    precio: [null as number | null, Validators.required],
    idTipo: [null as number | null, Validators.required],
  });

  onGuardar(): void {
    console.log('Form válido:', this.form.valid);
    console.log('Errores:', this.form.errors);
    console.log('Valores:', this.form.value);
    if (this.form.valid) {
      this.guardar.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  @Input() set eventoEditar(evento: Evento | null) {
    if (evento) {
      const idTipo = (evento as any).tipo?.idTipo?.toString() ?? null;
      console.log('idTipo calculado:', idTipo);
      this.form.patchValue({
        nombre: evento.nombre,
        descripcion: evento.descripcion,
        fechaInicio: evento.fechaInicio
          ? new Date(evento.fechaInicio).toISOString().split('T')[0]
          : '',
        duracion: evento.duracion,
        direccion: evento.direccion,
        estado: evento.estado,
        destacado: evento.destacado,
        aforoMaximo: evento.aforoMaximo,
        minimoAsistencia: evento.minimoAsistencia,
        precio: evento.precio,
        idTipo: idTipo,
      });
      console.log('valor en form tras patchValue:', this.form.controls.idTipo.value);
    } else {
      this.form.reset();
    }
  }
}
