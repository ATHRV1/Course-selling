import axios from "axios";
import { useEffect, useState } from "react";
import { FiAward, FiDollarSign, FiEye, FiStar, FiUsers } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import CourseCard from "./courseCard";
import { Link } from "react-router-dom";

export default function CreatorDashboard() {
    const [size, setSize] = useState(0);
    const [students, setStudents] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [rating, setRating] = useState(0.0);
    const [courses, setCourses] = useState([]);
    const [last30, setLast30] = useState([]);
    
    useEffect(() => {
        // console.log("ran");
        async function fetch() {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/creator/info", {
                headers: {
                    token: token,
                },
            });
            // console.log("Response:", res.data); // See what backend returns
            setSize(res.data.totalCourses);
            setStudents(res.data.totalStudents);
            setRevenue(res.data.totalRevenue);
            setRating(res.data.averageRating);
            setCourses(res.data.courses);
            setLast30([
                res.data.last30.views,
                res.data.last30.users,
                res.data.last30.revenue,
            ]);
            // console.log(res.data.last30);
            // console.log(rating);
        }
        fetch();
    }, []);
    return (
        <div>
            <div className="ml-50 mt-10 flex">
                <div className="">
                    <p className="text-black font-medium text-3xl">
                        Instructor Dashboard
                    </p>
                    <p className="text-lg text-gray-600">
                        Manage your Courses and track Performance
                    </p>
                </div>
                <Link to="/create/course">
                    <button className="bg-black text-white rounded-xl h-11 w-42 ml-140 mt-2.5 text-lg cursor-pointer hover:bg-gray-800">
                        + Create Course
                    </button>
                </Link>
            </div>
            <div className="flex">
                <div className="ml-50 bg-white mt-5 w-62 h-32 p-5 rounded-xl">
                    <IoBookOutline className="text-blue-500 w-6 h-6" />
                    <p className="text-2xl font-medium mt-2">{size}</p>
                    <p className="text-gray-700">Total Courses</p>
                </div>
                <div className="ml-7.5 bg-white mt-5 w-62 h-32 p-5 rounded-xl">
                    <FiUsers className="text-purple-500 w-6 h-6" />
                    <p className="text-2xl font-medium mt-2">{students}</p>
                    <p className="text-gray-700">Total Students</p>
                </div>
                <div className="ml-7.5 bg-white mt-5 w-62 h-32 p-5 rounded-xl">
                    <FiDollarSign className="text-green-500 w-6 h-6" />
                    <p className="text-2xl font-medium mt-2">{revenue}</p>
                    <p className="text-gray-700">Total Revenue</p>
                </div>
                <div className="ml-7.5 bg-white mt-5 w-62 h-32 p-5 rounded-xl">
                    <FiStar className="text-orange-500 w-6 h-6" />
                    <p className="text-2xl font-medium mt-2">{rating}</p>
                    <p className="text-gray-700">Average Rating</p>
                </div>
            </div>
            <div className="flex items-start">
                <div className="flex bg-white w-170 ml-50 rounded-xl mb-10 mt-10 ">
                    <div className=" flex-1 pb-5">
                        <p className="ml-5 mt-4 text-xl font-medium">Your Courses</p>
                        {courses.map((course, index) => (
                            <CourseCard
                                key={index}
                                img={course.image}
                                title={course.title}
                                users={course.totalEnrolled}
                                rating={course.averageRating}
                                revenue={course.totalEarned}
                                published={course.isPublished}
                            />
                        ))}
                    </div>
                </div>
                <div className="ml-5 mt-10">
                    <div className="bg-white pl-4 pb-4 rounded-xl w-95">
                        <p className="font-medium w-95 pt-4">Last 30 Days</p>
                        <div className="flex mt-6">
                            <FiEye className="text-gray-500 w-4.5 h-4.5 mt-1" />
                            <p className="ml-2 text-gray-700 flex-1">Course Views</p>
                            <p className="mr-10 text-lg font-medium">{last30[0]}</p>
                        </div>
                        <div className="flex mt-6">
                            <FiUsers className="text-gray-500 w-4.5 h-4.5 mt-1" />
                            <p className="ml-2 flex-1 text-gray-700">New Students</p>
                            <p className="mr-10 text-lg font-medium">{last30[1]}</p>
                        </div>
                        <div className="flex mt-6">
                            <FiDollarSign className="text-gray-500 w-4.5 h-4.5 mt-1" />
                            <p className="ml-2 flex-1 text-gray-700">Revenue </p>
                            <p className="mr-10 text-lg font-medium">${last30[2]}</p>
                        </div>
                    </div>
                    <div className="bg-gray-800 pl-4 pb-4 rounded-xl w-95 mt-5 mb-20">
                        <div className="flex pt-4">
                            <FiAward className="text-white w-4.5 h-4.5 mt-1" />
                            <p className="ml-2 text-white font-medium">Tip</p>
                        </div>
                        <div className="pr-6">
                            <p className="text-gray-200 mt-2 text-xs">
                                Engage with your students by responding to questions promptly.
                                This helps build community and improves course ratings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
