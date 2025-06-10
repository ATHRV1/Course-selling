import { FiDollarSign, FiStar, FiUsers } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";


export default function CreatorDashboard(){
    return(
        <div>
            <div className="ml-50 mt-10 flex">
                <div className="">
                    <p className="text-black font-medium text-3xl">Instructor Dashboard</p>
                    <p className="text-lg text-gray-600">Manage your Courses and track Performance</p>
                </div>
                <button className="bg-black text-white rounded-xl h-11 w-42 ml-140 mt-2.5 text-lg">+ Create Course</button>
            </div>
            <div className="flex">
                <div className="ml-50 bg-white mt-5 w-62 h-32 p-5 rounded-xl">
                    <IoBookOutline className="text-blue-500 w-6 h-6" />
                    <p className="text-2xl font-medium mt-2">8</p>
                    <p className="text-gray-700">Total Courses</p>
                </div>
                <div className="ml-7.5 bg-white mt-5 w-62 h-32 p-5 rounded-xl">
                    <FiUsers className="text-green-500 w-6 h-6" />
                    <p className="text-2xl font-medium mt-2">2,847</p>
                    <p className="text-gray-700">Total Students</p>
                </div>
                <div className="ml-7.5 bg-white mt-5 w-62 h-32 p-5 rounded-xl">
                    <FiDollarSign className="text-purple-500 w-6 h-6" />
                    <p className="text-2xl font-medium mt-2">$12,450</p>
                    <p className="text-gray-700">Total Revenue</p>
                </div>
                <div className="ml-7.5 bg-white mt-5 w-62 h-32 p-5 rounded-xl">
                    <FiStar className="text-orange-500 w-6 h-6" />
                    <p className="text-2xl font-medium mt-2">4.8</p>
                    <p className="text-gray-700">Average Rating</p>
                </div>
            </div>
            <div className="flex">
                <div>
                    
                </div>
            </div>
        </div>
    );
}