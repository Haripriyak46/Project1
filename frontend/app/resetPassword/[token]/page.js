"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPassword() {

    const params = useParams();
    const router = useRouter();

    const token = params.token;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/user/resetPassword/${token}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }

            setMessage("Password reset successful!");

            setTimeout(() => {
                router.push("/login");
            }, 1500);

        } catch (error) {
            console.log(error);

            setMessage("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    Reset Password
                </h1>

                <p className="text-gray-500 text-center mt-2 mb-6">
                    Enter your new password
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                        className="w-full px-4 py-3 border
                        border-gray-300 rounded-lg
                        text-gray-800
                        focus:outline-none focus:ring-2
                        focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        required
                        className="w-full px-4 py-3 border
                        border-gray-300 rounded-lg
                        text-gray-800
                        focus:outline-none focus:ring-2
                        focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600
                        text-white py-3 rounded-lg
                        font-semibold hover:bg-blue-700"
                    >
                        Reset Password
                    </button>

                </form>

                {message && (
                    <p className="mt-5 text-center text-sm text-gray-700">
                        {message}
                    </p>
                )}

            </div>

        </div>
    );
}