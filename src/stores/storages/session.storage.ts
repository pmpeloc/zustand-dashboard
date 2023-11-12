import { StateStorage, createJSONStorage } from 'zustand/middleware';

const sessionApi: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    return sessionStorage.getItem(name);
  },
  setItem: function (name: string, value: string): void | Promise<void> {
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name);
  },
};

export const customSessionStorage = createJSONStorage(() => sessionApi);
