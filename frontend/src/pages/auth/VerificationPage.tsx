import React, { useState } from "react";
import { verifySmsCode } from "../../services/smsService.tsx";

const VerificationPage: React.FC = () => {
    const [code, setCode] = useState<string>('');

    const handleVerify = async () => {
        try {
            await verifySmsCode(code);
            console.log('Verification successfully!');
        } catch (error) {
            console.error('Verification error', error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Verify Your Phone Number</h2>
            <input
                type="text"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleVerify}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Verify
            </button>
        </div>
    );
}

export default VerificationPage;
