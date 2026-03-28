export interface Usuario {
  username: string;
  password?: string;
  email: string;
  nombre: string;
  apellidos: string;
  direccion: string;
  enabled: number;
  fechaRegistro: Date;
}