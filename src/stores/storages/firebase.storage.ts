import { StateStorage, createJSONStorage } from 'zustand/middleware';

const firebaseUrl =
  'https://zustand-storage-97f1d-default-rtdb.firebaseio.com/zustand';

const firebaseApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );

      return JSON.stringify(data);
    } catch (e) {
      throw new Error('Error on getItem');
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    try {
      await fetch(`${firebaseUrl}/${name}.json`, {
        method: 'PUT',
        body: value,
      }).then((res) => res.json());
    } catch (e) {
      throw new Error('Error on setItem');
    }
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name);
  },
};

export const firebaseStorage = createJSONStorage(() => firebaseApi);
