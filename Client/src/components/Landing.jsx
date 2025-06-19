import { useEffect, useState } from "react";
import axios from 'axios';
import CourseLand from "./CourseLand";

export default function Landing() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        async function fetch() {
            try {
                const res = await axios.get("http://localhost:3000/three/courses");
                setCourses(res.data.courses);

            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, [])



    return (
        <div>
            <div>
                <p className="text-black ml-124 text-5xl font-bold mt-18 ">
                    Learn Skills that Matter
                </p>
                <p className="mt-5 text-xl ml-95 text-gray-700">
                    Discover thousands of courses taught by expert instructors. Learn at
                    your own pace,
                </p>
                <p className="mt-0.5 text-xl ml-145 text-gray-700">
                    anytime, anywhere with Gyaanquest.
                </p>
            </div>
            <div className="flex ml-145 mt-8">
                <button className="bg-black text-white px-4 py-2 rounded-lg w-45 text-lg font-medium h-15 hover:bg-white hover:text-black cursor-pointer hover:border-2 hover:border-black">
                    Explore Courses
                </button>
                <button className="bg-white text-black px-4 py-2 rounded-lg w-45 text-lg font-medium h-15 ml-4 border-2 border-black cursor-pointer hover:bg-black hover:text-white">
                    Start Teaching
                </button>
            </div>
            <div className="bg-white flex pt-15 pb-15 mt-25 mb-10">
                <div className="ml-60">
                    <p className="text-4xl text-black font-bold">10,000+</p>
                    <p className="text-gray-700">Active Students</p>
                </div>
                <div className="ml-80">
                    <p className="text-4xl text-black font-bold ml-7.5">500+</p>
                    <p className="text-gray-700">Expert Instructors</p>
                </div>
                <div className="ml-80">
                    <p className="text-4xl text-black font-bold ml-2">1,200+</p>
                    <p className="text-gray-700">Quality Courses</p>
                </div>
            </div>
            <p className="ml-160 text-3xl font-bold">Featured Courses</p>
            <div className="flex pl-8">
                {courses.map((course) =>
                    <CourseLand key={course._id} title={course.title} creator={course.instructor} rating={course.averageRating} users={course.enrolledCount} duration={course.duration} price={course.price} />
                )}
            </div>

            <div className="bg-black mt-15 pt-10 mb-10">
                <p className="text-white ml-140 text-4xl font-bold">
                    Ready to Start Learning?
                </p>
                <p className="text-gray-300 ml-110 text-xl mt-10">
                    Join thousands of students who are already advancing their careers
                    with our
                </p>
                <p className="text-gray-300 ml-175 text-xl">expert-led courses.</p>
                <button className="bg-white text-black px-4 py-2 rounded-lg w-55 text-lg font-medium h-15 ml-168 mt-10 mb-15 border-2 cursor-pointer hover:bg-gray-100">
                    Browse All Courses
                </button>
            </div>
        </div>
    );
}
