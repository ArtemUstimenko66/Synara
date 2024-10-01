import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from "../interfaces/User.tsx";


interface RegistrationState {
    currentStep: number;
    userData: User;
}

const initialState: RegistrationState = {
    currentStep: 1,
    userData: {
        role: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: '',
        unp: 0,
        gender: '',
        region: '',
        city: '',
        street: '',
        house: 0,
        apartment: 0,
        helpTypes: [],
        documents: [],
        volunteerId: 0
    },
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setStep(state, action: PayloadAction<number>) {
            state.currentStep = action.payload;
        },
        updateUserData(state, action: PayloadAction<Partial<User>>) {
            state.userData = { ...state.userData, ...action.payload };
        },
    },
});

export const { setStep, updateUserData } = registrationSlice.actions;

export default registrationSlice.reducer;
