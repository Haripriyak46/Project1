"use client";

import { useState } from "react";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [resetUrl, setResetUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setResetUrl("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/user/forgotPassword",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }

            setMessage(data.message);
            setResetUrl(data.resetUrl);

        } catch (error) {
            console.log(error);

            setMessage("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    Forgot Password
                </h1>

                <p className="text-gray-500 text-center mt-2 mb-6">
                    Enter your email to reset your password
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-300
                        rounded-lg text-gray-800
                        focus:outline-none focus:ring-2
                        focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600
                        text-white py-3 rounded-lg
                        font-semibold hover:bg-blue-700"
                    >
                        Generate Reset Link
                    </button>

                </form>

                {message && (
                    <p className="mt-5 text-center text-sm text-gray-700">
                        {message}
                    </p>
                )}

                {resetUrl && (
                    <div className="mt-5 p-4 bg-blue-50 rounded-lg">

                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Development Reset Link:
                        </p>

                        <a
                            href={resetUrl}
                            className="text-blue-600 text-sm break-all hover:underline"
                        >
                            {resetUrl}
                        </a>

                    </div>
                )}

            </div>

        </div>
    );
}