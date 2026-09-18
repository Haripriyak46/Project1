
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/admin/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }

           
            localStorage.setItem(
                "adminToken",
                data.token
            );

           
            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

            router.push("/admin");

        } catch (error) {
            setMessage("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

               
                <div className="bg-white rounded-2xl shadow-2xl p-8">

                   
                    <div className="text-center mb-8">

                        <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-3xl">
                                🛡️
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Admin Login
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Sign in to access the admin dashboard
                        </p>

                    </div>

                    
                    <form onSubmit={handleLogin} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Admin Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter admin email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                                text-gray-800 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                focus:border-transparent transition duration-200"
                            />
                        </div>

                       
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Admin Password
                            </label>
                            <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                                text-gray-800 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                focus:border-transparent transition duration-200"
                            />
                            <button
                                type="button"
                                onClick={()=>setShowPassword(!showPassword)}
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
                            font-semibold hover:bg-blue-700
                            active:scale-[0.98]
                            transition duration-200
                            focus:outline-none focus:ring-2
                            focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Admin Login
                        </button>

                    </form>

                   
                    {message && (
                        <div className="mt-5 p-3 rounded-lg bg-gray-50 text-center">
                            <p className="text-sm text-gray-700">
                                {message}
                            </p>
                        </div>
                    )}

                </div>

               
                
            </div>
        </div>
    );
}

