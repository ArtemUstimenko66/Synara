import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice.ts';
import gatheringsReducer from './gatheringsSlice.ts';
import announcementsReducer from './announcementsSlice';

export const store = configureStore({
    reducer: {
        registration: registrationReducer,
        gatherings: gatheringsReducer,
        announcements: announcementsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;