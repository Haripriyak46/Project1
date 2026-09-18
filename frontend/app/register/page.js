
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/user/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }

            setMessage("Registration successful!");


            setTimeout(() => {
                router.push("/login");
            }, 1000);

        } catch (error) {
            setMessage("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">


                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Register a new account
                    </p>

                </div>


                <form onSubmit={handleRegister} className="space-y-5">

                   
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            focus:border-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            focus:border-blue-500 transition"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            focus:border-blue-500 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2
                                text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg
                        font-semibold hover:bg-blue-700 transition duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        focus:ring-offset-2"
                    >
                        Register
                    </button>

                </form>


                {message && (
                    <p className="mt-5 text-center text-sm text-gray-700">
                        {message}
                    </p>
                )}


                <div className="mt-6 text-center">

                    <p className="text-gray-600 text-sm">
                        Already have an account?
                    </p>

                    <button
                        onClick={() => router.push("/login")}
                        className="mt-2 text-blue-600 font-semibold
                        hover:text-blue-700 hover:underline transition"
                    >
                        Login
                    </button>

                </div>

            </div>
        </div>
    );
}
