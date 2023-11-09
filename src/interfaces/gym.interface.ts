// usuario.interface.ts
export interface usuarios {
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
  nombreDep: Deporte;
  dia: string;
  hora: string;
  usuarios: usuarios;
}
