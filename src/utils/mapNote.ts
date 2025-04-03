import { INote } from '@types';

export const mapNote = (notes: INote) => {
  return Object.entries(notes).map(([id, note]) => ({ id, ...note }));
};
