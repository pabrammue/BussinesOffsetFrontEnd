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
import {firebase} from '../environments/environments'

const firebaseConfig = {
  apiKey: firebase.apiKey,
  authDomain: firebase.authDomain,
  projectId: firebase.projectId,
  storageBucket: firebase.storageBucket,
  messagingSenderId: firebase.messagingSenderId,
  appId: firebase.appId,
  measurementId: firebase.measurementId
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
