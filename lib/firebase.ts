import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn(`Cannot find firebase api key or firebase project id`);
}


let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log("Firebase Client SDK Initialized");
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db: Firestore = getFirestore(app);

const useEmulators = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true';

if (useEmulators && !(auth as any)._emulatorUrl) {
  console.log('Connecting to Firebase Emulators (Client)...');
  try {
    const authHost = process.env.NEXT_PUBLIC_EMULATOR_AUTH_HOST || 'localhost:9099';
    const firestoreHost = process.env.NEXT_PUBLIC_EMULATOR_FIRESTORE_HOST || 'localhost';
    const firestorePort = parseInt(process.env.NEXT_PUBLIC_EMULATOR_FIRESTORE_PORT || '8080', 10);

    connectAuthEmulator(auth, `http://${authHost}`, { disableWarnings: true });
    console.log(`Auth Emulator connected to http://${authHost}`);

    connectFirestoreEmulator(db, firestoreHost, firestorePort);
    console.log(`Firestore Emulator connected to ${firestoreHost}:${firestorePort}`);

  } catch (e) {
    console.error("Firebase Emulator connection failed:", e);
  }
} else if (!useEmulators) {
  console.log('Connecting to production Firebase (Client)');
}

export { app, auth, db, provider };
