import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { initialLetter } from "../../atoms/atom";
import { useAtomValue } from "jotai";
import { FiMail, FiSave } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";



export default function CreatorProfile() {
    const [profile, setProfile] = useState(true);
    const ini = useAtomValue(initialLetter);

    useEffect(() => {
        async function fetch() {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/creator/credentials", {
                headers: {
                    token: token,
                },
            });
            console.log("Response:", res.data); // See what backend returns
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
        <div className="mb-20">
            <div className="flex">
                <div className="flex items-center gap-3 ml-60 mt-10">
                    <Link to="/creator/dashboard">
                        <button
                            className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </button></Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
                        <p className="text-md text-gray-500">Manage your account preferences</p>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="bg-white p-4 w-40 ml-60 mt-10 rounded-xl flex-none h-25">
                    <p className="hover:bg-gray-200 pl-2 mb-2 mt-1 text-lg h-7 pt-0.5 rounded-lg cursor-pointer" onClick={() => setProfile(true)}>Profile</p>
                    <p className="hover:bg-gray-200 pl-2 h-7 text-lg pt-0.5 rounded-lg cursor-pointer" onClick={() => setProfile(false)}>Account</p>
                </div>
                {profile ? (
                    <div className="bg-white ml-15 mt-10 rounded-xl pl-5 pr-6  py-5">
                        <p className="text-black text-xl font-medium">Profile Information</p>
                        <div className="flex">
                            <div
                                className=" cursor-pointer rounded-full  mt-10 bg-black text-white flex  justify-center font-semibold"
                                style={{
                                    width: 60,
                                    height: 60,
                                    fontSize: 60 * 0.6,
                                }}
                            >
                                {ini}
                            </div>

                            <div className="ml-5 mt-10">
                                <h2 className="text-xl font-semibold">Sarah Johnson</h2>
                                <p className="text-gray-600">Instructor</p>
                            </div>

                        </div>
                        <div className="flex">
                            <div>
                                <p className="mt-7 ml-2">Full Name</p>
                                <div
                                    tabIndex={0}
                                    className={`flex border-1 w-100 ml-2 mt-1 rounded-xl `}
                                >
                                    <FaRegUser className="mt-3 ml-2" />
                                    <input
                                        type="text"
                                        placeholder="Athrv Mittal"
                                        className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                                    />
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="mt-4 ml-5">Email Address</p>
                                <div
                                    className={`flex border-1 w-100 ml-5 mt-1 rounded-xl`}
                                >
                                    <FiMail className="mt-3 ml-2" />
                                    <input
                                        type="text"
                                        placeholder="your@email.com"
                                        className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-2">
                            <div>
                                <p className="mt-7 ml-2">Area of Expertise</p>
                                <select
                                    name="expertise"
                                    className="pl-2 w-100 ml-2 h-10 mt-1 border boorder-black rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none "

                                >
                                    <option value="select">Select your Expertise</option>
                                    <option value="Development">Development</option>
                                    <option value="Design">Design</option>
                                    <option value="Business">Business</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Music">Music</option>
                                    <option value="Language">Language</option>
                                </select>
                            </div>
                            <div>
                                <p className="mt-7 ml-5">Years of Experience</p>
                                <select
                                    name="experience"
                                    className=" p-2 w-100 ml-5 h-10 mt-1 border boorder-black rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none "

                                >
                                    <option value="select">Select your Experience</option>
                                    <option value="1-2">1-2 years</option>
                                    <option value="3-5">3-5 years</option>
                                    <option value="6-10">6-10 years</option>
                                    <option value="10+">10+ years</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <p className="mt-7 ml-2">Professional Bio</p>
                            <textarea
                                className=" pl-2 pt-1 ml-2 w-205 mt-1 h-30 border border-black rounded-xl  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                name="bio"
                                id="bio"
                                placeholder="Tell us about your Professional Background and what you had like to teach..."
                            ></textarea>
                        </div>
                        <button
                            // onClick={handleSaveChanges}
                            className="flex ml-2 mt-5 cursor-pointer py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <FiSave className=" h-5 w-5 mt-0.5 ml-2 text-white" />
                            <p className=' ml-2 mr-2'>Save Changes</p>
                        </button>
                    </div>

                ) : (<div> hello</div>)}
            </div>
        </div >
    );
}