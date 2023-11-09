import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, collectionData, query, getDocs, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usuarios$: Observable<any[]>;
  usuariosCollection: any;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.usuariosCollection = collection(this.firestore, 'usuarios');
    this.usuarios$ = collectionData(this.usuariosCollection);
  }

  

  register({ email, password, nombreCompleto }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Guarda el nombre completo en Firestore
        const userDoc = doc(this.usuariosCollection);
        setDoc(userDoc, {
          Id: user.uid,
          email: email,
          nombreCompleto: nombreCompleto
        });
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }


  

 

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }



  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario logueado:', userCredential.user);
      await this.updateUserData(userCredential.user);
      return userCredential;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  private async updateUserData(user: User) {
    try {
      const userRef = doc(this.firestore, 'usuarios', user.uid);
      const data = {
        id: user.uid,
        email: user.email,
        nombreCompleto: 'Nombre del Usuario', // Puedes obtener este dato del usuario si lo tienes
        // Otras propiedades del usuario si es necesario
      };
      await setDoc(userRef, data, { merge: true });
      console.log('Datos de usuario actualizados:', data);
    } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
    }
  }
  async obtenerUsuariosPorEmail(email: string): Promise<any | null> {
    const usuariosCollection = collection(this.firestore, 'usuarios');
    const usuariosQuery = query(usuariosCollection, where('email', '==', email));
    
    try {
      const usuariosSnapshot = await getDocs(usuariosQuery);
      
      if (!usuariosSnapshot.empty) {
        return usuariosSnapshot.docs[0].data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario por email:', error);
      return null;
    }
  }
}


/* login(email: string, password: string): Promise<any> {
  return signInWithEmailAndPassword(this.auth, email, password);
}*/