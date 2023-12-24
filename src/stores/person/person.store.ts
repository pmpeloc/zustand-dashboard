import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { firebaseStorage } from '../storages/firebase.storage';
import { logger } from '../middlewares/logger.middleware';
import { useWeddingBoundStore } from '../wedding';

interface PersonState {
  firstName: string;
  lastName: string;
}

interface PersonActions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<
  PersonState & PersonActions,
  [['zustand/devtools', never]]
> = (set) => ({
  firstName: '',
  lastName: '',
  setFirstName: (value: string) =>
    set(() => ({ firstName: value }), false, 'setFirtsName'),
  setLastName: (value: string) =>
    set(() => ({ lastName: value }), false, 'setLastName'),
});

export const usePersonStore = create<PersonState & PersonActions>()(
  logger(
    devtools(
      persist(storeAPI, {
        name: 'person-storage',
        // storage: customSessionStorage,
        storage: firebaseStorage,
      })
    )
  )
);

usePersonStore.subscribe((nextState) => {
  const { firstName, lastName } = nextState;

  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
});
