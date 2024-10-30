import api from "../../main-api/api.ts";

export const sendCodeToPhoneNumber = async (phoneNumber: string) => {
    try {
        await api.post('/sms/send-code', { phoneNumber });
        //console.log("Code sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending code:", error);
    }
};

export const verifyCode = async (phoneNumber: string, code: string): Promise<{ success: boolean }> => {
    if (!phoneNumber) {
        throw new Error('Phone number is not available');
    }
    try {
        await api.post('/sms/verify-code', { phoneNumber, code });
        localStorage.removeItem('phoneNumber');
        //console.log("Code verified successfully:", response.data);

        return { success: true };
    } catch (error) {
        console.error("Error verifying code:", error);
        return { success: false };
    }
};
