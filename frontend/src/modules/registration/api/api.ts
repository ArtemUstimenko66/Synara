import {User} from "../interfaces/User.tsx";

export const registerUser = async (userData: User) => {
    try {
        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

export const sendEmailConfirmation = async (email: string) => {
    try {
        const response = await fetch('http://localhost:8080/confirmation-email/send-confirmation-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const text = await response.text();
        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error("Email confirmation failed:", error);
        throw error;
    }
};
