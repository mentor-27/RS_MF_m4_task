import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  getAuth,
} from 'firebase/auth';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { notifications } from '@mantine/notifications';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDacwRYdxz-r65tT4Opy0Fdhb6rhJjyxs4',
  authDomain: 'notesproject-75d69.firebaseapp.com',
  databaseURL:
    'https://notesproject-75d69-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'notesproject-75d69',
  storageBucket: 'notesproject-75d69.firebasestorage.app',
  messagingSenderId: '264933970054',
  appId: '1:264933970054:web:f03c34487232f4ec0b0107',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db = getDatabase(app);

export const registerUser = async (email: string, password: string) => {
  try {
    const credentials: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await set(ref(db, 'users/' + credentials.user.uid), {
      email,
      createdAt: new Date().toISOString(),
    });

    return credentials;
  } catch (error) {
    let msg: string = '';

    if ((error as Error).message.includes('email-already-in-use')) {
      msg = 'Just visit login page and come in';
    }

    notifications.show({
      title: 'Already with us',
      message: msg,
      color: 'orange',
      withCloseButton: true,
    });
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const credentials: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return credentials;
  } catch (error) {
    let msg: string = '';

    if ((error as Error).message.includes('invalid-credential')) {
      msg = 'Invalid email or password';
    }

    notifications.show({
      title: 'Forgot something?',
      message: msg,
      color: 'red',
      withCloseButton: true,
    });
  }
};

export const logoutUser = async () => signOut(auth);
