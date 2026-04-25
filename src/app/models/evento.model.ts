export interface Evento {
  idEvento: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  duracion: number;
  direccion: string;
  estado: 'ACTIVO' | 'CANCELADO' | 'TERMINADO';
  destacado: 'S' | 'N';
  aforoMaximo: number;
  minimoAsistencia: number;
  precio: number;
  tipo?: {
    idTipo: number;
    nombre: string;
    descripcion: string;
  };
  idTipo?: number;
}
