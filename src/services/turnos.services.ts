import { Injectable } from '@angular/core';
import {  Firestore,   collection,  collectionData,  query,  where,  addDoc,  deleteDoc,  doc,  DocumentData,  DocumentReference,  setDoc, getDocs,} from '@angular/fire/firestore';
import { getDoc, updateDoc, writeBatch } from 'firebase/firestore/lite';
import { EMPTY, Observable, catchError, from, map, of } from 'rxjs';
import { usuarios, Deporte, Turno } from 'src/interfaces/gym.interface';


@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  turnosService: any;
  deporteSeleccionado: any;
  turnos: any[] = [];
  constructor(private firestore: Firestore) {}

 
  async agregarTurno(turno: Turno): Promise<void> {
    const turnosCollection = collection(this.firestore, 'turnos');

    // Agrega el documento a Firestore sin convertidor
    await addDoc(turnosCollection, turno);
    const usuariosCollection = collection (this.firestore, 'turnos')
    await addDoc(usuariosCollection, turno);
  }
  async obtenerDeportes() {
    const deportesCollection = collection(this.firestore, 'deportes');
    const deportesQuery = query(deportesCollection);
    const deportesSnapshot = await getDocs(deportesQuery);
    return deportesSnapshot.docs.map((doc) => doc.data() as Deporte);
  }
  
  

 async reservarTurno(turno: Omit<Turno, 'id'>): Promise<void> {
  const turnosCollection = collection(this.firestore, 'turnos');
  await addDoc(turnosCollection, turno);
  // Puedes agregar más lógica aquí si es necesario
}


  async modificarTurno(id: string, nuevoTurno: Turno): Promise<void> {
    const { nombreDep, dia, hora } = nuevoTurno;
    const turnoDoc = doc(this.firestore, 'turnos', id);
    await updateDoc(turnoDoc, { nombreDep, dia, hora });
  }
  
  
  eliminarTurno(id: string): Observable<void> {
    if (!id) {
      console.error('ID de turno no válido');
      return EMPTY; // Puedes usar EMPTY de RxJS para una observable vacío si el ID no es válido.
    }

    const docRef = doc(this.firestore, 'turnos', id);
    return from(deleteDoc(docRef));
  }
  

  mostrarTurno(id: string): Observable<Turno | null> {
    const turnoDocRef = doc(this.firestore, 'turnos', id);
    return from(getDoc(turnoDocRef)).pipe(
      map((doc) => (doc.exists() ? (doc.data() as Turno) : null)),
      catchError(() => of(null))
    );
  }
  getTurnos(): Observable<Turno[]> {
    const turnosCollection = collection(this.firestore, 'turnos');
    const turnosQuery = query(turnosCollection);
    return collectionData(turnosQuery) as Observable<Turno[]>;
  }

  // ... otros métodos

  cargarTurnos() {
    // Lógica para cargar los turnos desde el servicio de turnos.
    this.turnosService.getdeporteSeleccionado(this.deporteSeleccionado).subscribe(
      (turnos: any[]) => {
        this.turnos = turnos;
      },
      (error: any) => {
        console.error('Error al cargar los turnos', error);
      }
    );
  }










  addgymo(gymo: any) {
    const gymref = collection(this.firestore, 'gymo');
    return addDoc(gymref, gymo);
  }


}








  
/*turnos$: Observable<any[]>;
nuevoTurno: any;

constructor(private firestore: Firestore) {
  const collectionRef = collection(this.firestore, 'turnos');
  this.turnos$ = collectionData(collectionRef);
}



async agregarDocumentoDeTurno(turno: any) {
  const turnosCollection = collection(this.firestore, 'turnos');
  try {
    await addDoc(turnosCollection, turno);
    console.log('Documento de turno agregado con éxito');
  } catch (error) {
    console.error('Error al agregar el documento de turno', error);
  }
}



getFecha(): Observable<any[]> {
  const ref = collection(this.firestore, 'turnos');
  return collectionData(ref, { idField: 'id' }) as Observable<any>;
}

getTurnosPorActividad(actividad: string): Observable<any[]> {
  const q = query(collection(this.firestore, 'turnos'), where('actividad', '==', actividad));
  return collectionData(q);
}
 


agregarActividad(nombreActividad: string, fechasDisponibles: string[]): Observable<void> {
  const actividadDoc = doc(this.firestore, 'actividades', nombreActividad);
  return from(setDoc(actividadDoc, { nombre: nombreActividad, fechasDisponibles: fechasDisponibles }));
}

getTurnos(): Observable<any[]> {
  return this.turnos$;
}



*/
