import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp } from 'firebase/app';
import { FirebaseApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth'; // Si necesitas autenticación
import { provideDatabase } from '@angular/fire/database'; // Si usas base de datos en tiempo real
import { provideFirestore } from '@angular/fire/firestore'; // Si usas Firestore
import { provideStorage } from '@angular/fire/storage'; // Si usas almacenamiento
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA7PD6Rqbi5PzX2emJKTvKzMlE17OtoOuQ",
  authDomain: "business-offset.firebaseapp.com",
  projectId: "business-offset",
  storageBucket: "business-offset.firebasestorage.app",
  messagingSenderId: "220771304303",
  appId: "1:220771304303:web:f68b757bd002f1c1635e9a",
  measurementId: "G-E052HJED1B"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(()=> getAuth())
  ],

};
