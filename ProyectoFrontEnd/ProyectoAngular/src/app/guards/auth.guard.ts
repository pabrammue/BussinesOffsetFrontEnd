import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private firebaseApp = inject(FirebaseApp); // 🔹 Inyecta la app de Firebase

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable(observer => {
      const auth = getAuth(this.firebaseApp); // 🔹 Usa la instancia de Firebase inicializada

      onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          observer.next(true);
        } else {
          this.router.navigate(['/login']); // 🔹 Redirige correctamente al login
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}