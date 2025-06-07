import { FaRegUser } from "react-icons/fa";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate} from 'react-router-dom';

export default function UserSignup() {
  const nav=useNavigate();
  const [active, setActive] = useState(0);
  const Refs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [passerror, setPasserror] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [agree, setAgree] = useState(false);
  const [agreer, setAgreer] = useState("");
  const [error, setError] = useState("");

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
      await axios.post("http://localhost:3000/user/signup", data);
      setError("");
      nav('/');
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
      <div className="shadow-xl w-120 h-182 m-15 mx-auto">
        <h1 className="font-bold text-3xl ml-25 pt-5">Create an Account</h1>
        <p className="text-gray-500 ml-5 mt-3 text-lg">
          Join GyaanQuest and start your Learning Journey today
        </p>
        <p className="mt-7 ml-10">Full Name</p>
        <div
          tabIndex={0}
          className={`flex border-1 w-100 ml-10 mt-1 rounded-xl ${active === 0 ? "border-blue-500 ring-2 ring-blue-300" : "null"
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
        <p className="mt-4 ml-10">Email Address</p>
        <div
          className={`flex border-1 w-100 ml-10 mt-1 rounded-xl ${active === 1 ? "border-blue-500 ring-2 ring-blue-300" : "null"
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
        <p className="mt-4 ml-10">Password</p>
        <div
          className={`flex border-1 w-100 ml-10 mt-1 rounded-xl ${active === 2 ? "border-blue-500 ring-2 ring-blue-300" : "null"
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
        <p className="mt-4 ml-10">Confirm Password</p>
        <div
          className={`flex border-1 w-100 ml-10 mt-1 rounded-xl ${active === 3 ? "border-blue-500 ring-2 ring-blue-300" : "null"
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
          className="bg-blue-500 ml-10 w-100 rounded-lg mt-6 h-10 text-white text-xl hover:bg-blue-600 cursor-pointer"
        >
          Create Account
        </button>
        <div className="flex mt-3">
          <hr className="mt-5 w-45 ml-11 text-gray-300" />
          <p className="mt-1.5 ml-2 text-gray-500">or</p>
          <hr className="mt-5 ml-2 w-45 text-gray-300" />
        </div>
        <div className="flex mt-3">
          <p className="text-md ml-26 mt-0.5">Already have an Account?</p>
          <Link to="/user/signin">
            <p className="ml-2 mt-0.5 text-blue-500 font-bold text-md hover:text-blue-600 cursor-pointer">
              Sign in
            </p>
          </Link>
        </div>
        <div className="flex mt-2 ">
          <p className="text-md ml-12 mt-0.5 w-75 text-gray-600">
            Want to Teach on GyaanQuest?
          </p>
          <p className="ml-1 mt-0.5 w-70 text-blue-400 font-bold text-md hover:text-blue-500 cursor-pointer">
            Become an Instructor
          </p>
        </div>
      </div>
    </div>
  );
}
