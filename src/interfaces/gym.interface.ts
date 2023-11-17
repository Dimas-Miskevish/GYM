// usuario.interface.ts
export interface usuarios {
  id?: string; // Ahora es opcional
  nombreCompleto: string;
  email: string;
}

// deporte.interface.ts
export interface Deporte {
  id: string;
  nombreDep: string;
  dia: string;
  hora: string
  // Otros campos relacionados con el deporte
}

// turno.interface.ts
// turno.interface.ts
export interface Turno {
  id?: string; // Mantén el ID automático de Firestore (puede ser opcional)
  idAsignado: string; // Nuevo campo para el ID asignado manualmente
  nombreDep: Deporte;
  dia: string;
  hora: string;
  usuarios: usuarios;
}

