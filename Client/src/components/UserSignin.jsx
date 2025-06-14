import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export default function UserSignin() {
    const nav = useNavigate();
    const [active, setActive] = useState(0);
    const Refs = [useRef(null), useRef(null)];
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');


    async function submit() {
        try {
            const response = await axios.post("http://localhost:3000/user/signin", data);
            localStorage.setItem('token', response.data.token);
            nav('/');
        }
        catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            }
            else {
                setError("Network error Occured")
            }
        }
    }
    const handleKeyDown = (e, index) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < 2) {
                setActive(nextIndex);
                Refs[nextIndex].current.focus();
            }
        }
    };
    return (
        <div>
            <div className="shadow-xl w-120 h-130 m-15 mx-auto">
                <h1 className="font-bold text-3xl ml-34 pt-5">Welcome Back</h1>
                <p className="text-gray-500 ml-18 mt-3 text-lg">
                    Sign in to continue your Learning Journey
                </p>
                <p className="mt-7 ml-10">Email Address</p>
                <div
                    className={`flex border-1 w-100 ml-10 mt-1 rounded-xl ${active === 1 ? "border-blue-500 ring-2 ring-blue-300" : "null"
                        }`}
                >
                    <FiMail className="mt-3 ml-2" />
                    <input
                        ref={Refs[0]}
                        type="text"
                        placeholder="your@email.com"
                        className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                        onKeyDown={(e) => handleKeyDown(e, 0)}
                        onFocus={() => setActive(1)}
                        value={data.email}
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                        }}
                    />
                </div>
                <p className="mt-4 ml-10">Password</p>
                <div
                    className={`flex border-1 w-100 ml-10 mt-1 rounded-xl ${active === 2 ? "border-blue-500 ring-2 ring-blue-300" : "null"
                        }`}
                >
                    <FiLock className="mt-3 ml-2" />
                    <input
                        ref={Refs[1]}
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                        onKeyDown={(e) => handleKeyDown(e, 1)}
                        onFocus={() => setActive(2)}
                        value={data.password}
                        onChange={(e) => {
                            setData({ ...data, password: e.target.value });
                        }}
                    />
                    <button
                        className="mr-2.5"
                        onClick={() => {
                            setShowPassword((showPassword) => !showPassword);
                        }}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>
                <p className="text-red-500 text-sm mt-1.5 ml-10">{error}</p>
                <button
                    onClick={submit}
                    className="bg-blue-500 ml-10 w-100 rounded-lg mt-6 h-10 text-white text-xl hover:bg-blue-600 cursor-pointer"
                >
                    Sign in
                </button>
                <div className="flex mt-3">
                    <hr className="mt-5 w-45 ml-11 text-gray-300" />
                    <p className="mt-1.5 ml-2 text-gray-500">or</p>
                    <hr className="mt-5 ml-2 w-45 text-gray-300" />
                </div>
                <div className="flex mt-4">
                    <p className="text-md ml-24 mt-0.5">Don't have an Account?</p>
                    <Link to="/user/signup">
                        <p className="ml-2 mt-0.5 text-blue-500 font-bold text-md hover:text-blue-600 cursor-pointer">
                            Sign up now
                        </p>
                    </Link>
                </div>
                <div className="flex mt-2">
                    <p className="text-md ml-22 mt-0.5 w-41 text-gray-600">
                        Are you an Instructor?
                    </p>
                    <Link to="/creator/signin" >
                        <p className="mt-0.5 w-40 text-blue-400 font-bold text-md hover:text-blue-500 cursor-pointer">
                            Sign in as Creator
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
