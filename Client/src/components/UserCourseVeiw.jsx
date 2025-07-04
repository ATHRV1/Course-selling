import { FiArrowLeft } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { Usersignin } from "../../atoms/atom";
import { useAtomValue } from "jotai";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCourseView() {
    const location = useLocation();
    const courseData = location.state?.course;
    const isSignedin = useAtomValue(Usersignin);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const nav=useNavigate();

    if (!isSignedin) {
        return (
            <div className="ml-170 mt-10 text-2xl text-red-500">You are not signed in</div>
        );
    }

    if (!courseData) {
        return (
            <div className="ml-170 mt-10 text-2xl text-red-500">Course not found</div>
        );
    } else {
        async function enroll() {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.post('http://localhost:3000/enroll/course', {
                    token,
                    courseId: courseData.courseId,
                });
                if (response.data.success) {
                    setShowSuccessModal(true);
                }
            } catch (error) {
                console.error(error.response?.data?.message || 'Enrollment failed');
            }
        }
        function close(){
            setShowSuccessModal(false);
            nav("/user/landing");
        }
        return (
            <div className="mb-20">
                 {showSuccessModal && (
                    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
                                <p className="text-gray-600">You have successfully enrolled for this course</p>
                            </div>
                            <button 
                                onClick={close}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex ml-90 mt-5">
                    <Link to="/all/courses">
                        <div className="flex text-gray-700">
                            <FiArrowLeft className="mt-5 h-5 w-8 text-gray-600 rounded-xl hover:bg-gray-200 cursor-pointer" />
                            <p className="mt-4">Back to Courses</p>
                        </div>
                    </Link>
                </div>

                <div className="flex">
                    <div className="w-135 ml-92 mt-10 ">
                        <div className="relative">
                            <img
                                src="http://localhost:3000/public/images/courses/course-d.png"
                                alt=""
                                className="h-64 w-150 rounded-xl"
                            />
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <div className="flex gap-3 mb-4">
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                    {courseData.category}
                                </span>
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                    {courseData.level}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {courseData.title}
                            </h1>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {courseData.description}
                            </p>

                            <div className="grid grid-cols-3 gap-8 mb-8">
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
                        </div>

                    </div>
                    <div className="bg-white rounded-xl shadow-lg w-73 h-90 p-6 ml-5 mt-10">
                        <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-gray-900 mb-1">${courseData.price}</div>
                            <div className="text-gray-600 text-sm">Price</div>
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
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">By Instructor</span>
                                    <span className="font-semibold text-gray-900">{courseData.creatorName}</span>
                                </div>
                            </div>
                            <button onClick={enroll} className="bg-black text-white w-60 h-10 rounded-lg cursor-pointer mt-5 hover:bg-gray-800">Enroll Now</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}