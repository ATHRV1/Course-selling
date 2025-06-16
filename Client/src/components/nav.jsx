import { IoBookOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiBell, FiSearch } from "react-icons/fi";
import { CreatorSigninDone, initialLetter } from "../../atoms/atom";
import { useAtomValue } from "jotai";
import { useState } from "react";

export default function Nav() {
    const sign = useAtomValue(CreatorSigninDone);
    const ini = useAtomValue(initialLetter);
    const [showDropdown, setShowDropdown] = useState(true);

    return (
        <div className="flex fixed pt-4 shadow-md top-0 z-50 w-full bg-white  pb-2">
            <Link to="/">
                <div className="flex ml-30 pt-1">
                    <IoBookOutline className="text-black w-10 h-10" />
                    <h1 className="ml-2 text-2xl font-bold">Gyaanquest</h1>
                </div>
            </Link>
            <div className="flex ml-10 pt-2.5">
                <p className="text-lg ml-3 text-gray-800 cursor-pointer">Courses</p>
                <Link to={sign ? "/creator/dashboard" : "/creator/signin"}>
                    <p className="text-lg ml-7 text-gray-800 cursor-pointer">
                        {sign ? "Instructor" : "Teach"}
                    </p>
                </Link>
            </div>
            <div className="ml-10 mt-1 border-2 border-gray-700 flex rounded-xl">
                <FiSearch className="w-5 h-5 text-gray-500 mt-2 ml-1" />
                <input
                    type="text"
                    placeholder="Search for anything"
                    className="w-132 pl-2 outline-none"
                />
            </div>
            <div className="flex ml-10">
                <BsCart className="mt-2.5 w-6 h-6 text-gray-600" />
                <FiBell
                    className="w-6 h-6 text-gray-500 mt-3
                 ml-4 mr-3"
                />
                {ini ? (
                    <>
                        <div
                            className=" cursor-pointer rounded-full ml-2.5 mt-1.5 bg-black text-white flex  justify-center font-semibold"
                            style={{
                                width: 35,
                                height: 35,
                                fontSize: 35 * 0.6, // Adjust font size relative to circle size
                            }}
                            onClick={() => setShowDropdown((showDropdown) => !showDropdown)}
                        >
                            {ini}
                        </div>
                        {showDropdown && (
                            <div className="absolute right-70 mt-12 w-48 bg-white rounded-xl shadow-lg py-2.5 z-50">
                                <Link to="/creator/profile">
                                    <button onClick={() => setShowDropdown(false)} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                        Profile
                                    </button>
                                </Link>
                                <Link to="/creator/dashboard">
                                    <button
                                        onClick={() => setShowDropdown(false)}
                                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        Dashboard
                                    </button>
                                </Link>
                                <hr className="w-45 text-gray-300 mx-auto my-1" />
                                <button
                                    onClick={() => setShowDropdown(false)}
                                    className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <Link to="/user/signin">
                            <button className=" pb-1 ml-2 border-1 border-gray-400 w-20 rounded-lg text-gray-800 cursor-pointer h-11">
                                Log in
                            </button>
                        </Link>
                        <Link to="/user/signup">
                            <button className=" pb-1 ml-2 border-1 border-gray-400 w-20 rounded-lg bg-black text-white cursor-pointer h-11">
                                Sign up
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
