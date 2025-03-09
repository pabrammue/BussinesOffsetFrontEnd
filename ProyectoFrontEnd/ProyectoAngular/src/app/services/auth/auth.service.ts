import { Injectable, inject, signal } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth)

  constructor() {
    setPersistence(this.firebaseAuth, browserSessionPersistence)// browserSessionPersistence significa que la sesión solo dura mientras la pestaña esté abierta
   }


  /**
   * Método que intenta realizar el login en firebase
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
    return from(promise)
  }

  /**
   * Método que cierra sesión de firebase
   * @returns 
   */
  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {});
    return from(promise);
  }
}
