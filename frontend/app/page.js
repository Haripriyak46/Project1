
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

              
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Home Page
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome to your dashboard
                    </p>
                </div>

                {user ? (
                    <>
                       
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Welcome, {user.name}
                            </h2>

                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-medium text-gray-800">
                                        Email:
                                    </span>{" "}
                                    {user.email}
                                </p>
                            </div>
                        </div>

                       
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        
                        <div className="text-center">
                           
                            <div className="flex flex-col gap-3">

                                <button
                                    onClick={() => router.push("/login")}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                                >
                                    User Login
                                </button>

                                <button
                                    onClick={() => router.push("/admin/login")}
                                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition duration-200"
                                >
                                    Admin Login
                                </button>

                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

