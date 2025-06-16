import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CreatorCourseView() {
    const location = useLocation();
    const courseData = location.state?.course;
    const nav=useNavigate();

    async function onDelete(){
        const token = localStorage.getItem('token');

        if (!token) {
            alert("No authentication token found");
            return;
        }

        try {
            await axios.post("http://localhost:3000/delete/course",
                { courseId: courseData.courseId },
                { headers: { token } }
            );
            alert("Course deleted successfully");
            nav("/creator/dashboard");
        } catch (err) {
            console.error("Delete error:", err);
            alert(err.response?.data?.message || "Failed to delete course");
        }
    }


    if (!courseData) {
        return (
            <div className="ml-170 mt-10 text-2xl text-red-500">Course not found</div>
        );
    } else {
        return (
            <div className="mb-20">
                <div className="flex ml-90 mt-5">
                    <Link to="/creator/dashboard">
                        <div className="flex text-gray-700">
                            <FiArrowLeft className="mt-5 h-5 w-8 text-gray-600 rounded-xl hover:bg-gray-200 cursor-pointer" />
                            <p className="mt-4">Back to Dashboard</p>
                        </div>
                    </Link>
                    
                        <div className="flex gap-2 ml-140 mt-3">
                            <Link to="/edit/course">
                            <button
                                className="flex cursor-pointer items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                Edit
                            </button></Link>

                            <button
                                onClick={onDelete}
                                className="flex cursor-pointer items-center justify-center w-10 h-10 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-colors duration-200"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    
                </div>
                <div className="flex">
                    <div className="w-135 ml-92 mt-10 ">
                        <div className="relative">
                            <img
                                src={courseData.image || null}
                                alt=""
                                className="h-64 object-cover rounded-xl"
                            />
                            {courseData.isPublished ? (
                                <div className="absolute top-3 left-3">
                                    <span className="bg-green-100 text-green-700 h-5 rounded-xl w-20 pl-1.5 text-sm font-medium">
                                        Published
                                    </span>
                                </div>
                            ) : (
                                <div className="absolute top-3 left-3">
                                    <span className="bg-yellow-100 text-yellow-700 h-5 rounded-xl w-12 font-medium pl-1.5 text-sm">
                                        Draft
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-8">
                            {/* Category and Level Tags */}
                            <div className="flex gap-3 mb-4">
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                    {courseData.category}
                                </span>
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                    {courseData.level}
                                </span>
                            </div>

                            {/* Course Title */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {courseData.title}
                            </h1>

                            {/* Course Description */}
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {courseData.description}
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-8 mb-8">
                                {/* Students */}
                                <div className="text-center">
                                    <div className="flex justify-center mb-2">
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {courseData.totalEnrolled.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-500">Students</div>
                                </div>

                                {/* Rating */}
                                <div className="text-center">
                                    <div className="flex justify-center mb-2">
                                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {courseData.averageRating}
                                    </div>
                                    <div className="text-sm text-gray-500">Rating</div>
                                </div>

                                {/* Duration */}
                                <div className="text-center">
                                    <div className="flex justify-center mb-2">
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {courseData.duration}
                                    </div>
                                    <div className="text-sm text-gray-500">Duration</div>
                                </div>
                            </div>

                            {/* Revenue Performance Card */}

                        </div>

                    </div>
                    <div className="bg-white rounded-xl shadow-lg w-73 h-90 p-6 ml-5 mt-10">
                        <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-gray-900 mb-1">${courseData.totalEarned}</div>
                            <div className="text-gray-600 text-sm">Total Revenue</div>
                        </div>

                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-2xl font-bold text-gray-900">${courseData.price}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">Total students</span>
                                    <span className="font-semibold text-gray-900">{courseData.totalEnrolled}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">Average rating</span>
                                    <span className="font-semibold text-gray-900">{courseData.averageRating}/5</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">Last updated</span>
                                    <span className="font-semibold text-gray-900">2 days ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}