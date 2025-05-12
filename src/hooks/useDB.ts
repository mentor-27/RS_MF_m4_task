import { useEffect, useState } from 'react';
import {
  ref,
  onValue,
  get,
  push,
  update,
  remove,
  DatabaseReference,
} from 'firebase/database';

import { db } from '../../firebase.ts';
import { INote, TNoteData } from '@types';
import { mapNote } from '@utils/mapNote';
import { useAuth } from '@context/AuthProvider';

export const useDB = () => {
  const [notes, setNotes] = useState<INote>({});
  const [isPending, setIsPending] = useState<boolean>(true);
  const auth = useAuth();

  const dbRef = (noteId: string = ''): DatabaseReference => {
    return ref(db, `notes/${auth?.userData?.uid}/${noteId}`);
  };

  useEffect(() => {
    return onValue(dbRef(), async snapshot => {
      const data = await snapshot.val();
      setNotes(data ?? {});
      setIsPending(false);
    });
  }, []);

  const getNote = async (noteId: string) => {
    setIsPending(true);
    const resp = await get(dbRef(noteId));
    const note = resp.val();
    setIsPending(false);
    return note;
  };

  const addNote = async (note: TNoteData): Promise<void> => {
    setIsPending(true);
    return push(dbRef(), {
      ...note,
      uid: auth?.userData?.uid,
      createdAt: new Date().toISOString(),
    }).then(() => setIsPending(false));
  };

  const editNote = async (
    noteId: string,
    newNote: Partial<TNoteData>
  ): Promise<void> => {
    setIsPending(true);
    return update(dbRef(noteId), newNote).finally(() => setIsPending(false));
  };

  const deleteNote = (noteId: string) => {
    setIsPending(true);
    remove(dbRef(noteId)).finally(() => setIsPending(false));
  };

  return {
    data: mapNote(notes),
    getNote,
    isPending,
    addNote,
    editNote,
    deleteNote,
  };
};
