
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
            router.push("/login");
            return;
        }

        const parsedUser = JSON.parse(userData);

        setUser(parsedUser);

        setFormData({
            name: parsedUser.name || parsedUser.userName || "",
            email: parsedUser.email || "",
            phone: parsedUser.phone || "",
        });

    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/user/userDashboard",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to update profile");
                return;
            }

            setUser(data.user);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );
            setIsEditing(false);

            alert("Profile updated successfully!");

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };


    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">
                    Loading...
                </p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100">

            <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold text-blue-600">
                    User Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg
                    hover:bg-red-600 transition"
                >
                    Logout
                </button>

            </nav>

            <main className="max-w-5xl mx-auto px-6 py-10">

                <div className="bg-white rounded-xl shadow-md p-6 mb-6">

                    <h2 className="text-2xl font-bold text-gray-800">
                        Welcome, {user.name || user.userName}!
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Welcome to your user dashboard.
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-xl font-semibold text-gray-800">
                            My Profile
                        </h2>


                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg
                                hover:bg-blue-700 transition"
                            >
                                Edit Profile
                            </button>
                        )}

                    </div>


                    {isEditing ? (

                        <form onSubmit={handleUpdateProfile}>

                            <div className="mb-5">

                                <label className="block text-sm text-gray-500 mb-2">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg
                                    px-4 py-2 focus:outline-none focus:ring-2
                                    focus:ring-blue-500"
                                    required
                                />

                            </div>

                            <div className="mb-5">

                                <label className="block text-sm text-gray-500 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg
                                    px-4 py-2 focus:outline-none focus:ring-2
                                    focus:ring-blue-500"
                                    required
                                />

                            </div>


                            {/* Phone */}

                            <div className="mb-5">

                                <label className="block text-sm text-gray-500 mb-2">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg
                                    px-4 py-2 focus:outline-none focus:ring-2
                                    focus:ring-blue-500"
                                />

                            </div>

                            <div className="flex gap-3">

                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-5 py-2 rounded-lg
                                    hover:bg-green-700 transition"
                                >
                                    Save Changes
                                </button>


                                <button
                                    type="button"
                                    onClick={() => {

                                        setIsEditing(false);

                                        setFormData({
                                            name: user.name || user.userName || "",
                                            email: user.email || "",
                                            phone: user.phone || "",
                                        });

                                    }}
                                    className="bg-gray-500 text-white px-5 py-2 rounded-lg
                                    hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Name
                                </p>

                                <p className="text-lg font-medium text-gray-800">
                                    {user.name ||
                                        user.userName ||
                                        "Not available"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="text-lg font-medium text-gray-800">
                                    {user.email || "Not available"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Phone
                                </p>

                                <p className="text-lg font-medium text-gray-800">
                                    {user.phone || "Not available"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Role
                                </p>

                                <p className="text-lg font-medium text-gray-800">
                                    {user.role || "User"}
                                </p>

                            </div>

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

