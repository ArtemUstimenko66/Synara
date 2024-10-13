import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFilteredAnnouncements, getFilteredVolunteers } from '../modules/main-page/api/mainPageService.ts';

interface AnnouncementsState {
    announcements: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    filteredAnnouncements: any[] | null;
    isLoading: boolean;
    error: string | null;
    hasMore: boolean;
    sortOrder: 'ASC' | 'DESC';
    offset: number;
    limit: number;
}

const initialState: AnnouncementsState = {
    announcements: [],
    status: 'idle',
    filteredAnnouncements: null,
    isLoading: false,
    error: null,
    hasMore: true,
    sortOrder: 'ASC',
    offset: 0,
    limit: 12,
};

// async thunk
export const fetchAnnouncements = createAsyncThunk(
    'announcements/fetchAnnouncements',
    async ({ query, types, urgency, sortOrder, role, offset, limit, genderParam, ageFrom, ageTo }: any, { rejectWithValue }) => {
        try {
            let data;
            if (role === 'volunteer') {
                data = await getFilteredAnnouncements(query, types, limit, offset, sortOrder, urgency);
            } else {
                data = await getFilteredVolunteers(query, types, limit, offset, sortOrder, genderParam, ageFrom, ageTo);
            }
            return data;
        } catch (error) {
            return rejectWithValue('Error fetching announcements');
        }
    }
);


const announcementsSlice = createSlice({
    name: 'announcements',
    initialState,
    reducers: {
        resetAnnouncements: (state) => {
            state.announcements = [];
            state.offset = 0;
            state.hasMore = true;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAnnouncements.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(fetchAnnouncements.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.isLoading = false;
                state.status = 'succeeded';
                if (state.offset === 0) {
                    state.announcements = action.payload;
                } else {
                    state.announcements = [...state.announcements, ...action.payload];
                }
                state.hasMore = action.payload.length === state.limit;
            })
            .addCase(fetchAnnouncements.rejected, (state, action) => {
                state.status = 'failed';
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetAnnouncements } = announcementsSlice.actions;
export default announcementsSlice.reducer;
