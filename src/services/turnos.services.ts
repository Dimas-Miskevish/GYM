import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  setDoc,
} from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore/lite';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  turnos$: Observable<any[]>;
  nuevoTurno: any;

  constructor(private firestore: Firestore) {
    const collectionRef = collection(this.firestore, 'turnos');
    this.turnos$ = collectionData(collectionRef);
  }

  addgymo(gymo: any) {
    const gymref = collection(this.firestore, 'gymo');
    return addDoc(gymref, gymo);
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

  getTurnosPorActividadYFecha(actividad: string, fecha: string): Observable<any[]> {
    const q = query(
      collection(this.firestore, 'turnos'),
      where('actividad', '==', actividad),
      where('fecha', '==', fecha)
    );
    return collectionData(q);
  }

  getFecha(): Observable<any[]> {
    const ref = collection(this.firestore, 'turnos');
    return collectionData(ref, { idField: 'id' }) as Observable<any>;
  }

  getTurnosPorActividad(actividad: string): Observable<any[]> {
    const q = query(collection(this.firestore, 'turnos'), where('actividad', '==', actividad));
    return collectionData(q);
  }
  getFechasDisponibles(actividad: string): Promise<string[] | null> {
    return new Promise<string[] | null>(async (resolve) => {
      const actividadDocRef = doc(this.firestore, 'actividades', actividad);
      const actividadDocSnap = await getDoc(actividadDocRef);

      if (actividadDocSnap.exists()) {
        const data = actividadDocSnap.data();
        resolve(data['FechasDisponibles'] || []);
      } else {
        resolve(null);
      }
    });
  }


  agregarActividad(nombreActividad: string, fechasDisponibles: string[]): Observable<void> {
    const actividadDoc = doc(this.firestore, 'actividades', nombreActividad);
    return from(setDoc(actividadDoc, { nombre: nombreActividad, fechasDisponibles: fechasDisponibles }));
  }

  getTurnos(): Observable<any[]> {
    return this.turnos$;
  }

  async agregarTurno(actividad: string, fecha: string, hora: string): Promise<void> {
    const nuevoTurno = {
      actividad,
      fecha,
      hora,
    };

    try {
      await addDoc(collection(this.firestore, 'turnos'), nuevoTurno);
    } catch (error) {
      console.error('Error al agregar el turno', error);
      throw error;
    }
  }

  eliminarTurno(id: string): Observable<void> {
    return from(deleteDoc(doc(this.firestore, 'turnos/' + id)));
  }
}
