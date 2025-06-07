import { IoBookOutline } from "react-icons/io5";

export default function Footer() {
    return (
        <div className="bg-gray-900">
            <div className="flex">
                <div>
                    <div className="flex ml-30 pt-1 mt-10">
                        <IoBookOutline className="text-blue-600 w-10 h-10" />
                        <h1 className="ml-2 text-2xl font-bold text-white">Gyaanquest</h1>
                    </div>
                    <div className="ml-30 mt-5 text-gray-400 text-lg">
                        Gyaanquest is a leading online learning platform with  <br />
                        thousands of courses taught by expert instructors.<br />
                        Learn at your own pace, anytime, anywhere.
                    </div>
                </div>
                <div className=" grid grid-cols-3 gap-4 mt-12">
                    <div className="ml-30">
                        <h1 className="text-white text-lg font-bold">Categories</h1>
                        <div className="text-gray-400 mt-6 text-lg">Web Development</div>
                        <div className="text-gray-400 mt-2 text-lg">Data Science</div>
                        <div className="text-gray-400 mt-2 text-lg">Marketing</div>
                        <div className="text-gray-400 mt-2 text-lg">Design</div>
                        <div className="text-gray-400 mt-2 text-lg">Business</div>
                    </div>
                    <div className="ml-30">
                        <h1 className="text-white text-lg font-bold">Quick Links</h1>
                        <div className="text-gray-400 mt-6 text-lg">All Courses</div>
                        <div className="text-gray-400 mt-2 text-lg">My Dashboard</div>
                        <div className="text-gray-400 mt-2 text-lg">Become an Instructor</div>
                        <div className="text-gray-400 mt-2 text-lg">About Us</div>
                        <div className="text-gray-400 mt-2 text-lg">Contact Us</div>
                    </div>
                    <div className="ml-30">
                        <h1 className="text-white text-lg font-bold">Help & Support</h1>
                        <div className="text-gray-400 mt-6 text-lg">FAQ</div>
                        <div className="text-gray-400 mt-2 text-lg">Support</div>
                        <div className="text-gray-400 mt-2 text-lg">Terms of Service</div>
                        <div className="text-gray-400 mt-2 text-lg">Privacy Policy</div>
                        <div className="text-gray-400 mt-2 text-lg">Refund Policy</div>
                    </div>
                </div>
            </div>
            <div className="mt-5 ml-30 text-gray-400 text-lg mb-10">
                © 2025 Gyaanquest. All rights reserved.
            </div>
        </div>
    );
}
