
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();

    const [admin, setAdmin] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        const adminData = localStorage.getItem("admin");

        if (!token) {
            router.push("/admin/login");
            return;
        }

        if (adminData) {
            setAdmin(JSON.parse(adminData));
        }
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/admin/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setUsers(data.users);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    <h1 className="text-xl font-bold">
                        Admin Panel
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition duration-200"
                    >
                        Logout
                    </button>

                </div>
            </nav>


<main className="max-w-7xl mx-auto px-6 py-8">

    <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
        </h2>
    </div>

   
    <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto">

        <div className="flex items-center gap-5 mb-6">

            <div className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                A
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-800">
                    Welcome Admin
                </h3>

                {admin && (
                    <p className="text-gray-500">
                        {admin.email}
                    </p>
                )}
            </div>

        </div>

        {admin && (
            <div className="border-t border-gray-200 pt-4">

                <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-gray-600">
                        Email
                    </span>

                    <span className="text-gray-800">
                        {admin.email}
                    </span>
                </div>

                <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-gray-600">
                        Role
                    </span>

                    <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-medium text-gray-700">
                        Administrator
                    </span>
                </div>

            </div>
        )}

    </div>


    
    <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto mt-8">

        <div className="flex items-center justify-between mb-5">

            <div>
                <h3 className="text-xl font-semibold text-gray-800">
                    Users
                </h3>

                <p className="text-gray-500 mt-1">
                    Manage users
                </p>
            </div>

            <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
                {users.length} Users
            </span>

        </div>

        <div className="border-t border-gray-200 pt-5">

            {users.length === 0 ? (

                <p className="text-gray-500 text-center py-6">
                    No users found.
                </p>

            ) : (

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">

                    {users.map((user) => (

                        <div
                            key={user._id}
                            className="border border-gray-200 rounded-xl p-5"
                        >

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Name
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1">
                                        {user.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1">
                                        {user.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Phone
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1">
                                        {user.phone || "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Role
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1">
                                        {user.role}
                                    </p>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    </div>

</main>

        </div >
    );
}
