import { FaRegUser } from "react-icons/fa";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function CreatorSignup() {
    const nav = useNavigate();
    const [active, setActive] = useState(0);
    const Refs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const fileRef = useRef(null);
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        area: "",
        experience: "",
        bio: "",
    });
    const [passerror, setPasserror] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [agree, setAgree] = useState(false);
    const [agreer, setAgreer] = useState("");
    const [error, setError] = useState("");

    function boxClick() {
        fileRef.current.click();
    }
    function tick() {
        if (!agree) {
            setAgreer("");
        }
        setAgree((agree) => !agree);
    }
    async function submit() {
        setPasserror(""); // Clear previous errors
        setAgreer("");
        setError("");
        if (data.password != data.confirm_password) {
            setPasserror("Passwords do not Match");
            setError("");
            return;
        }
        if (!agree) {
            setAgreer("You must agree to the Terms of Services and Privacy Policy");
            return;
        }
        try {
            await axios.post("http://localhost:3000/creator/signup", data);
            setError("");
            nav("/creator/signin");
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Network error occurred");
            }
        }
    }
    const handleKeyDown = (e, index) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < 4) {
                setActive(nextIndex);
                Refs[nextIndex].current.focus();
            }
        }
    };
    return (
        <div>
            <div className="shadow-xl w-230 h-270 m-15 mx-auto">
                <h1 className="font-bold text-3xl ml-80 pt-5">Become an Instructor</h1>
                <p className="text-gray-500 ml-9 mt-3 text-lg">
                    Join GyaanQuest and start your Teaching Journey today. Earn Money by
                    Teaching Students all around the world.
                </p>
                <div className="flex mt-2">
                    <div>
                        <p className="mt-7 ml-10">Full Name</p>
                        <div
                            tabIndex={0}
                            className={`flex border-1 w-100 ml-10 mt-1 rounded-xl ${active === 0
                                ? "border-blue-500 ring-2 ring-blue-300 outline-none"
                                : "null"
                                }`}
                        >
                            <FaRegUser className="mt-3 ml-2" />
                            <input
                                ref={Refs[0]}
                                type="text"
                                placeholder="Athrv Mittal"
                                className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                                onKeyDown={(e) => handleKeyDown(e, 0)}
                                onFocus={() => setActive(0)}
                                value={data.username}
                                onChange={(e) => {
                                    setData({ ...data, username: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="mt-4 ml-10">Email Address</p>
                        <div
                            className={`flex border-1 w-100 ml-10 mt-1 rounded-xl ${active === 1
                                ? "border-blue-500 ring-2 ring-blue-300 outline-none"
                                : "null"
                                }`}
                        >
                            <FiMail className="mt-3 ml-2" />
                            <input
                                ref={Refs[1]}
                                type="text"
                                placeholder="your@email.com"
                                className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                                onKeyDown={(e) => handleKeyDown(e, 1)}
                                onFocus={() => setActive(1)}
                                value={data.email}
                                onChange={(e) => {
                                    setData({ ...data, email: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <p className="mt-4 ml-10">Password</p>
                        <div
                            className={`flex border-1 w-100 ml-10 mt-1 rounded-xl ${active === 2
                                ? "border-blue-500 ring-2 ring-blue-300 outline-none"
                                : "null"
                                }`}
                        >
                            <FiLock className="mt-3 ml-2" />
                            <input
                                ref={Refs[2]}
                                type={showPassword1 ? "text" : "password"}
                                placeholder="password"
                                className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                                onKeyDown={(e) => handleKeyDown(e, 2)}
                                onFocus={() => setActive(2)}
                                value={data.password}
                                onChange={(e) => {
                                    setData({ ...data, password: e.target.value });
                                    if (e.target.value === data.confirm_password) {
                                        setPasserror("");
                                    }
                                }}
                            />
                            <button
                                className="mr-2.5"
                                onClick={() => {
                                    setShowPassword1((showPassword1) => !showPassword1);
                                }}
                            >
                                {showPassword1 ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <p className="mt-4 ml-10">Confirm Password</p>
                        <div
                            className={`flex border-1 w-100 ml-10 mt-1 rounded-xl ${active === 3
                                ? "border-blue-500 ring-2 ring-blue-300 outline-none"
                                : "null"
                                }`}
                        >
                            <FiLock className="mt-3 ml-2" />
                            <input
                                ref={Refs[3]}
                                type={showPassword2 ? "text" : "password"}
                                placeholder="password"
                                className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                                onKeyDown={(e) => handleKeyDown(e, 3)}
                                onFocus={() => setActive(3)}
                                value={data.confirm_password}
                                onChange={(e) => {
                                    const tt = e.target.value;
                                    setData({ ...data, confirm_password: tt });

                                    if (tt !== data.password) {
                                        setPasserror("Passwords do not match");
                                    } else {
                                        setPasserror("");
                                    }
                                }}
                            />
                            <button
                                className="mr-2.5"
                                onClick={() => {
                                    setShowPassword2((showPassword2) => !showPassword2);
                                }}
                            >
                                {showPassword2 ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex mt-2">
                    <div>
                        <p className="mt-7 ml-10">Area of Expertise</p>
                        <select
                            name="expertise"
                            className="pl-2 w-100 ml-10 h-10 mt-1 border boorder-black rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none "
                            onChange={(e) => {
                                setData({ ...data, area: e.target.value });
                            }}
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
                        <p className="mt-7 ml-10">Years of Experience</p>
                        <select
                            name="experience"
                            className=" p-2 w-100 ml-10 h-10 mt-1 border boorder-black rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none "
                            onChange={(e) => {
                                setData({ ...data, experience: e.target.value });
                            }}
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
                    <p className="mt-7 ml-10">Professional Bio</p>
                    <textarea
                        className=" pl-2 pt-1 ml-10 w-210 mt-1 h-30 border border-black rounded-xl  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        name="bio"
                        id="bio"
                        placeholder="Tell us about your Professional Background and what you had like to teach..."
                        onChange={(e) => {
                                setData({ ...data, bio: e.target.value });
                            }}
                    ></textarea>
                </div>
                <p className="mt-3 ml-10">Upload your Resume</p>

                <div className="mt-1">
                    <input type="file" className="hidden" ref={fileRef} />
                    <div
                        onClick={boxClick}
                        className="bg-blue-100 flex justify-center pt-10 h-30 ml-10 w-210 rounded-xl border-2 border-gray-400 border-dashed hover:bg-blue-200 cursor-pointer"
                    >
                        Click here to Upload your Resume
                    </div>
                </div>

                <p className="text-red-500 text-sm mt-1.5 ml-10">{passerror}</p>

                <div className="flex mt-4">
                    <input
                        type="checkbox"
                        className="ml-10.5 w-4.5 h-4.5 mt-1"
                        onChange={tick}
                    />
                    <div className="flex ml-2">
                        I agree to the{" "}
                        <p className="text-blue-500 ml-1 mr-1">Terms of Services</p> and{" "}
                        <p className="text-blue-500 ml-1">Privacy Policy</p>
                    </div>
                </div>
                <p className="text-red-500 text-sm mt-1.5 ml-10">{agreer}</p>
                <p className="text-red-500 text-sm mt-1.5 ml-10">{error}</p>
                <button
                    onClick={submit}
                    className="bg-blue-500 ml-10 w-210 pl-8 rounded-lg mt-6 h-13 text-white text-xl hover:bg-blue-600 cursor-pointer"
                >
                    Apply to Become an Instructor
                </button>
                <div className="flex mt-3">
                    <hr className="mt-5 w-101 ml-11 text-gray-300" />
                    <p className="mt-1.5 ml-2 text-gray-500">or</p>
                    <hr className="mt-5 ml-2 w-100 text-gray-300" />
                </div>
                <div className="flex mt-3">
                    <p className="text-lg ml-86 mt-0.5">Already an Instructor?</p>
                    <Link to="/creator/signin">
                        <p className="ml-2 mt-0.5 text-blue-500 font-bold text-lg hover:text-blue-600 cursor-pointer">
                            Sign in
                        </p>
                    </Link>
                </div>
                <div className="flex mt-2 ">
                    <p className="text-lg ml-72 mt-0.5 w-51 text-gray-600">
                        Looking to learn instead?
                    </p>
                    <Link to="/user/signup">
                        <p className="ml-1 mt-0.5 w-70 text-blue-400 font-bold text-lg hover:text-blue-500 cursor-pointer">
                            Student Sign up
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
