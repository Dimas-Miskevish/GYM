import { Injectable } from '@angular/core';
import {  Firestore,   collection,  collectionData,  query,  where,  addDoc,  deleteDoc,  doc,  DocumentData,  DocumentReference,  setDoc, getDocs, orderBy, limit,} from '@angular/fire/firestore';
import { getDoc, updateDoc, writeBatch } from 'firebase/firestore/lite';
import { EMPTY, Observable, catchError, from, isEmpty, map, of } from 'rxjs';
import { usuarios, Deporte, Turno } from 'src/interfaces/gym.interface';



@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  turnosService: any;
  deporteSeleccionado: any;
  turnos: any[] = [];
  private ultimoId: number = 0;

    private turnosCollection = collection(this.firestore, 'turnos');

  constructor(private firestore: Firestore) {}

  
 
  async agregarTurno(turno: Turno): Promise<void> {
    const turnosCollection = collection(this.firestore, 'turnos');
    const usuariosCollection = collection(this.firestore, 'usuarios');  // Asegúrate de tener la colección correcta
  
    // Agrega el documento a Firestore en ambas colecciones
    await addDoc(turnosCollection, turno);
    await addDoc(usuariosCollection, turno);
  }
  
  async obtenerDeportes() {
    const deportesCollection = collection(this.firestore, 'deportes');
    const deportesQuery = query(deportesCollection);
    const deportesSnapshot = await getDocs(deportesQuery);
    return deportesSnapshot.docs.map((doc) => doc.data() as Deporte);
  }
  
  

  async reservarTurno(turnoData: any): Promise<string> {
    try {
      // Incrementa el contador antes de usarlo
      this.ultimoId++;
      const nuevoId = this.ultimoId;

      // Agregar el nuevo turno con el ID generado
      await addDoc(this.turnosCollection, { ...turnoData, id: nuevoId });

      console.log('Turno guardado correctamente. ID:', nuevoId);

      return nuevoId.toString();
    } catch (error) {
      console.error('Error al guardar el turno:', error);
      throw error;
    }
  }



  async eliminarTurno(idAsignado: string): Promise<void> {
    try {
      const turnosCollection = collection(this.firestore, 'turnos');
      const querySnapshot = await getDocs(query(turnosCollection, where('idAsignado', '==', idAsignado)));
      
      if (!querySnapshot.empty) {
        const turnoDoc = querySnapshot.docs[0].ref;
        await deleteDoc(turnoDoc);
        console.log('Turno eliminado con éxito. ID Asignado:', idAsignado);
      } else {
        console.error('No se encontró el turno con ID asignado:', idAsignado);
      }
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
      throw error;
    }
  }
  


  async modificarTurno(idAsignado: string, nuevoTurno: Turno): Promise<void> {
    try {
      const turnoDoc = doc(this.firestore, 'turnos', idAsignado);
      await setDoc(turnoDoc, nuevoTurno);
      console.log('Turno modificado con éxito. ID:', idAsignado);
    } catch (error) {
      console.error('Error al modificar el turno:', error);
      throw error;
    }
  }
  
  
  

  
    
  

  mostrarTurno(idAsignado: string): Observable<Turno | null> {
    // Utilizar una consulta para buscar el turno por ID asignado
    const turnosQuery = query(this.turnosCollection, where('idAsignado', '==', idAsignado));
    return from(getDocs(turnosQuery)).pipe(
      map((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Devolver el primer turno encontrado
          const doc = querySnapshot.docs[0];
          return doc.exists() ? (doc.data() as Turno) : null;
        } else {
          return null; // No se encontraron turnos con el ID asignado
        }
      }),
      catchError(() => of(null))
    );
  }

  getTurnos(): Observable<Turno[]> {
    // Obtén todos los documentos de la colección
    const turnosQuery = getDocs(this.turnosCollection);
    return from(turnosQuery).pipe(
      map((querySnapshot) => querySnapshot.docs.map((doc) => doc.data() as Turno))
    );
  }


  // ... otros métodos

  cargarTurnos() {
  // Lógica para cargar los turnos desde el servicio de turnos.
  this.turnosService.getTurnos().subscribe(
    (turnos: Turno[]) => {
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
