import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private firebaseApp = inject(FirebaseApp); 

  constructor(private router: Router) {}

  /**
   * Método para la protección de rutas
   * si el usuario está autorizado no hay problema peros si no lo está e intenta entrar a alguna ruta protegida redirige a la pantalla de login
   * @returns 
   */
  canActivate(): Observable<boolean> {
    return new Observable(observer => {
      const auth = getAuth(this.firebaseApp); 

      onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          observer.next(true);
        } else {
          this.router.navigate(['/login']); 
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}