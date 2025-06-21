import axios from "axios";
import { LayoutDashboard } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { FiArrowRight, FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function CreatorLanding() {
    const [creatorname, setCreatorname] = useState('')

    useEffect(() => {
        async function fetch() {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/creator/credentials", {
                    headers: {
                        token: token,
                    },
                });
                setCreatorname(res.data.username);
            }
            catch (err) {
                console.log(err);
            }

        }
        fetch();
    }, [])



    return (
        <div>
            <div className="bg-white pl-45 py-20">
                <p className="text-3xl font-bold">Welcome Back, {creatorname}!</p>
                <p className="text-gray-600 mt-2">Ready to share your knowledge?</p>
            </div>
            <div className="pb-10">
                <p className="text-xl font-medium ml-45 mt-6">Quick Actions</p>
                <div className="flex ">
                    <Link to="/create/course">
                        <div className="bg-white ml-45 mt-5 w-90 pb-7 rounded-lg cursor-pointer">
                            <p className="text-6xl ml-39 text-gray-700">+</p>
                            <p className="font-medium ml-27 mt-1">Create New Course</p>
                            <p className="text-gray-500 ml-20 mt-1">Start Building your Course</p>
                        </div>
                    </Link>
                    <Link to="/creator/dashboard">
                        <div className="bg-white ml-10 mt-5 w-90 pb-7 pt-7 rounded-lg cursor-pointer">
                            <LayoutDashboard className="text-6xl ml-39  size-8 text-gray-700" />
                            <p className="font-medium ml-27 mt-1">Creator Dashboard</p>
                            <p className="text-gray-500 ml-20 mt-1">Your creation, your control</p>
                        </div>
                    </Link>
                    <Link to="/creator/profile">
                        <div className="bg-white ml-10 mt-5 pt-7 w-90 pb-7 rounded-lg cursor-pointer">
                            <FiUser className="text-6xl ml-39  size-8 text-gray-700" />
                            <p className="font-medium ml-30 mt-1">Your Account</p>
                            <p className="text-gray-500 ml-28 mt-1">Manage Yourself</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="pb-10 bg-white pt-5">
                <p className="text-xl font-medium ml-45 mt-6">Quick Actions</p>
                <div className="flex">
                    <div className="bg-gray-100 ml-45 mt-5 w-140 pb-7 rounded-lg pt-5">
                        <p className="text-lg ml-4 text-gray-700">Course Creation Guide</p>
                        <p className="text-gray-500 text-md ml-4 mt-1">Learn how to create engaging Courses</p>
                        <div className="flex hover:underline cursor-pointer">
                            <p className="font-medium ml-4 mt-1">Read Guide </p>
                            <p className="hover:underline"><FiArrowRight className="mt-2.25 ml-1" /></p>
                        </div>
                    </div>
                    <div className="bg-gray-100 ml-10 mt-5 w-140 pb-7 rounded-lg pt-5">
                        <p className="text-lg ml-4 text-gray-700">Course Creation Guide</p>
                        <p className="text-gray-500 text-md ml-4 mt-1">Learn how to create engaging Courses</p>
                        <div className="flex hover:underline cursor-pointer">
                            <p className="font-medium ml-4 mt-1">Read Guide </p>
                            <p className="hover:underline"><FiArrowRight className="mt-2.25 ml-1" /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}