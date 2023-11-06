import {  Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where, addDoc, deleteDoc, doc, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import gymo from 'src/interfaces/gym.interface';



@Injectable({
  providedIn: 'root'
})
export class TurnosService {
    turnos$: Observable<any[]>;

    constructor(private firestore: Firestore) {
      const collectionRef = collection(this.firestore, 'turnos');
      this.turnos$ = collectionData(collectionRef);
    }
  
    addgymo(gymo: gymo) {
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
  
    getTurnosPorActividad(actividad: string): Observable<any[]> {
      const q = query(collection(this.firestore, 'turnos'), where('actividad', '==', actividad));
      return collectionData(q);
    }
 // Método para convertir un campo `timestamp` en un objeto `Date`
 convertirTimestampADate(timestamp: Timestamp): Date {
    return timestamp.toDate();
  }

  // Obtener fechas disponibles por actividad
  getFechasDisponiblesPorActividad(actividad: string): Observable<any[]> {
    const q = query(collection(this.firestore, 'actividades'), where('nombre', '==', actividad));
    return collectionData(q);
  }

  
      
      agregarActividad(nombreActividad: string, fechasDisponibles: string[]): Observable<void> {
        const actividadDoc = doc(this.firestore, 'actividades', nombreActividad);
        return setDoc(actividadDoc, { nombre: nombreActividad, FechasDisponibles: fechasDisponibles });
      }

    
  
    getDiasYHorariosPorActividad(actividad: string): Observable<any[]> {
      const q = query(collection(this.firestore, 'actividades'), where('actividad', '==', actividad));
      return collectionData(q);
    }
  
    getTurnos(): Observable<any[]> {
      return this.turnos$;
    }
  
    agregarTurno(actividad: string, fecha: Date, hora: string): Observable<any> {
      const nuevoTurno = {
        actividad,
        fecha,
        hora
      };
      return from(addDoc(collection(this.firestore, 'turnos'), nuevoTurno));
    }
  
    eliminarTurno(id: string): Observable<void> {
      return from(deleteDoc(doc(this.firestore, 'turnos/' + id)));
    }
  }

function setDoc(actividadDoc: DocumentReference<DocumentData>, arg1: { nombre: string; FechasDisponibles: string[]; }): Observable<void> {
    throw new Error('Function not implemented.');
}
