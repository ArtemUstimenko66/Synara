import React, { useState, useEffect } from 'react';
import { verifySmsCode, sendVerificationCode } from '../../services/smsService';
import { useNavigate } from 'react-router-dom';

const VerificationPage: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [canResend, setCanResend] = useState<boolean>(true);
    const [resendTimer, setResendTimer] = useState<number>(30);
    const navigate = useNavigate();

    useEffect(() => {
        let timer: number;
        if (!canResend) {
            timer = window.setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        clearInterval(timer);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [canResend]);

    const handleVerify = async () => {
        try {
            await verifySmsCode(code);
            navigate('/profile');
            setError(null);
        } catch (error) {
            setError('Verification error');
        }
    };

    const handleResendCode = async () => {
        const phoneNumber = localStorage.getItem('phoneNumber');
        if (!phoneNumber) {
            setError('Phone number is not available');
            return;
        }

        try {
            await sendVerificationCode(phoneNumber);
            setError(null);
            setCanResend(false);
        } catch (error) {
            setError('Error sending SMS code');
        }
    };

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
            <p className="text-center mt-4">
                {canResend ? (
                    <button
                        onClick={handleResendCode}
                        className="text-blue-500 hover:underline"
                    >
                        Don't receive code? Try again
                    </button>
                ) : (
                    `Please wait ${resendTimer} seconds to resend`
                )}
            </p>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
}

export default VerificationPage;
