import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export default function CreatorSignin() {
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
            const response =await axios.post("http://localhost:3000/creator/signin", data);
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
                <h1 className="font-bold text-3xl ml-31 pt-5">Instructor Portal</h1>
                <p className="text-gray-500 ml-16 mt-3 text-lg">
                    Sign in to manage your courses and students
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
                    className="bg-blue-500 ml-10 w-100 rounded-lg mt-6 h-11 text-white text-xl hover:bg-blue-600 cursor-pointer"
                >
                    Sign in to Instructor Portal
                </button>
                <div className="flex mt-3">
                    <hr className="mt-5 w-45 ml-11 text-gray-300" />
                    <p className="mt-1.5 ml-2 text-gray-500">or</p>
                    <hr className="mt-5 ml-2 w-45 text-gray-300" />
                </div>
                <div className="flex mt-4">
                    <p className="text-md ml-32 mt-0.5">New Instructor?</p>
                    <Link to="/creator/signup">
                        <p className="ml-2 mt-0.5 text-blue-500 font-bold text-md hover:text-blue-600 cursor-pointer">
                            Apply to teach
                        </p>
                    </Link>
                </div>
                <div className="flex mt-2">
                    <p className="text-md ml-28 mt-0.5 w-33 text-gray-600">
                        Looking to learn?
                    </p>
                    <Link to="/user/signin">
                        <p className="mt-0.5 w-30 text-blue-400 font-bold text-md hover:text-blue-500 cursor-pointer">
                            Student sign in
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
