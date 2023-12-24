import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { PersonSlice, createPersonSlice } from './person.slice';
import { GuestSlice, createGuestSlice } from './guest.slice';
import { createDateSlice, DateSlice } from './date.slice';
import { createConfirmSlice, ConfirmSlice } from './confirm.slice';

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmSlice;

export const useWeddingBoundStore = create<ShareState>()(
  // persist(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmSlice(...a),
  }))
  //   { name: 'wedding-store' }
  // )
);
