import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice.ts';
import gatheringsReducer from './gatheringsSlice.ts';

export const store = configureStore({
    reducer: {
        registration: registrationReducer,
        gatherings: gatheringsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;