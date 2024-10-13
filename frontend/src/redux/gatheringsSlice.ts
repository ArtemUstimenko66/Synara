import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {fetchGatherings} from "../modules/gathering/api/gatheringPageService.ts";

interface GatheringState {
    gatherings: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    offset: number;
    hasMore: boolean;
}

const initialState: GatheringState = {
    gatherings: [],
    status: 'idle',
    error: null,
    offset: 0,
    hasMore: true,
};

// async thunk
export const loadGatherings = createAsyncThunk(
    'gatherings/load',
    async (params: any, { rejectWithValue }) => {
        try {
            const { query, types, limit, offset, moneyFrom, moneyTo, sortOrder, urgency } = params;
            return await fetchGatherings(query, types, limit, offset, moneyFrom, moneyTo, sortOrder, urgency);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const gatheringsSlice = createSlice({
    name: 'gatherings',
    initialState,
    reducers: {
        resetGatherings: (state) => {
            state.gatherings = [];
            state.offset = 0;
            state.hasMore = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadGatherings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadGatherings.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.status = 'succeeded';
                if (state.offset === 0) {
                    state.gatherings = action.payload;
                } else {
                    state.gatherings = [...state.gatherings, ...action.payload];
                }
                state.hasMore = action.payload.length > 12;
            })
            .addCase(loadGatherings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load gatherings';
            });
    },
});

export const { resetGatherings } = gatheringsSlice.actions;
export default gatheringsSlice.reducer;
