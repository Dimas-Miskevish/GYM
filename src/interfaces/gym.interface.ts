// usuario.interface.ts
export interface Usuario {
  id: string;
  nombreCompleto: string;
  email: string;
}

// deporte.interface.ts
export interface Deporte {
  id: string;
  dia: string;
  hora: string
  // Otros campos relacionados con el deporte
}

// turno.interface.ts
export interface Turno {
  id: string;
  deporteSeleccionado: Deporte;
  dia: string;
  hora: string;
  usuario: Usuario;
}
