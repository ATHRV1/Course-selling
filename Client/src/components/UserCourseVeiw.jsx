import { FiArrowLeft } from "react-icons/fi";
import { Link, useLocation} from "react-router-dom";
import { Usersignin } from "../../atoms/atom";
import { useAtomValue } from "jotai";

export default function UserCourseView() {
    const location = useLocation();
    const courseData = location.state?.course;
    const isSignedin=useAtomValue(Usersignin);
    if(!isSignedin){
        return (
            <div className="ml-170 mt-10 text-2xl text-red-500">You are not signed in</div>
        );
    }

    if (!courseData) {
        return (
            <div className="ml-170 mt-10 text-2xl text-red-500">Course not found</div>
        );
    } else {
        console.log(courseData);
        return (
            <div className="mb-20">
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
                                        {courseData.averageRating.$numberDecimal}
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
                            <div className="text-3xl font-bold text-gray-900 mb-1">${courseData.price*courseData.totalEnrolled}</div>
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
                                    <span className="font-semibold text-gray-900">{courseData.averageRating.$numberDecimal}/5</span>
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