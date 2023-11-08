import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, collectionData } from '@angular/fire/firestore';
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

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
