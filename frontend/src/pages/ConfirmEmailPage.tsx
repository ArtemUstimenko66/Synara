import React from "react";

const ConfirmEmailPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Check your email</h1>
                <p className="text-gray-600">We have sent a confirmation email to your inbox. Please check your email to proceed.</p>
            </div>
        </div>
    );
}

export default ConfirmEmailPage;
