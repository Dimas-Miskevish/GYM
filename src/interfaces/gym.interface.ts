export default interface gymo {
  id?: string;
  actividad: string;
  dia: string; // Campo que almacena el día (ej. 'Lunes', 'Martes')
  hora: string; // Campo que almacena la hora (ej. '16:00')
  diasYHorariosDisponibles: string[]; 
}
  