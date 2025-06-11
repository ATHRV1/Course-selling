import axios from "axios";
import { useEffect, useState } from "react";
import { FiDollarSign, FiStar, FiUsers } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import CourseCard from "./courseCard";

export default function CreatorDashboard() {
    const [size, setSize] = useState(0);
    const [students, setStudents] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [rating, setRating] = useState(0.0);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
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
            console.log(res.data.courses);
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
                <button className="bg-black text-white rounded-xl h-11 w-42 ml-140 mt-2.5 text-lg">
                    + Create Course
                </button>
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
            <div className="flex bg-white w-170 ml-50 rounded-xl mb-10 mt-10 ">
                <div className="pb-5">
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
        </div>
    );
}
