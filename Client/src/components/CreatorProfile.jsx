import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initialLetter } from "../../atoms/atom";
import { useAtomValue, useSetAtom } from "jotai";
import { FiEye, FiEyeOff, FiLock, FiMail, FiSave } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { CreatorSigninDone } from "../../atoms/atom";

export default function CreatorProfile() {
    const nav = useNavigate();
    const [profile, setProfile] = useState(true);
    const ini = useAtomValue(initialLetter);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [expertise, setExpertise] = useState("");
    const [experience, setExperience] = useState("");
    const [bio, setBio] = useState("");
    const [success, setSuccess] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [changed, setChanged] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const setSigninDone = useSetAtom(CreatorSigninDone);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        async function fetch() {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/creator/credentials", {
                headers: {
                    token: token,
                },
            });
            setName(res.data.username);
            setEmail(res.data.email);
            setExpertise(res.data.expertise);
            setExperience(res.data.experience);
            setBio(res.data.bio);
        }
        fetch();
    }, []);

    function handleSave() {
        const token = localStorage.getItem("token");
        axios
            .post(
                "http://localhost:3000/creator/update",
                {
                    username: name,
                    email: email,
                    expertise: expertise,
                    experience: experience,
                    bio: bio,
                },
                {
                    headers: {
                        token: token,
                    },
                }
            )
            .then(() => {
                setSuccess(true);
            })
            .catch((error) => {
                console.error("There was an error updating the profile!", error);
            });
    }

    function handleSave2() {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const token = localStorage.getItem("token");
        axios
            .post(
                "http://localhost:3000/creator/update-password",
                {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                },
                {
                    headers: {
                        token: token,
                    },
                }
            )
            .then(() => {
                setChanged(true);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setError("");
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "There was an error updating the password!";
                setError(errorMessage);
                setChanged(false);
            });
    }
    async function handleDelete() {
        const token = localStorage.getItem("token");
        try {
            await axios.post("http://localhost:3000/creator/delete",{}, {
                headers: {
                    token: token,
                },
            });
            localStorage.removeItem("token");
            
            setSigninDone(false);
            nav("/creator/signup");
        }
        catch(err){
            setDeleteError(err.response?.data?.message||"There was an error deleting the account!");
        }

    }
    return (
        <>
            <div className="mb-20">
                <div className="flex">
                    <div className="flex items-center gap-3 ml-60 mt-10">
                        <Link to="/creator/dashboard">
                            <button className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors">
                                <ArrowLeft className="w-6 h-6 text-gray-600" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Profile Settings
                            </h1>
                            <p className="text-md text-gray-500">
                                Manage your account preferences
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="bg-white p-4 w-40 ml-60 mt-10 rounded-xl flex-none h-25">
                        <p
                            className="hover:bg-gray-200 pl-2 mb-2 mt-1 text-lg h-7 pt-0.5 rounded-lg cursor-pointer"
                            onClick={() => setProfile(true)}
                        >
                            Profile
                        </p>
                        <p
                            className="hover:bg-gray-200 pl-2 h-7 text-lg pt-0.5 rounded-lg cursor-pointer"
                            onClick={() => setProfile(false)}
                        >
                            Account
                        </p>
                    </div>
                    {profile ? (
                        <div className="bg-white ml-15 mt-10 rounded-xl pl-5 pr-6  py-5">
                            <p className="text-black text-xl font-medium">
                                Profile Information
                            </p>
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
                                    <h2 className="text-xl font-semibold">{name}</h2>
                                    <p className="text-gray-600">Instructor</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div>
                                    <p className="mt-7 ml-2">Full Name</p>
                                    <div className={`flex border-1 w-100 ml-2 mt-1 rounded-xl `}>
                                        <FaRegUser className="mt-3 ml-2" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className="mt-4 ml-5">Email Address</p>
                                    <div className={`flex border-1 w-100 ml-5 mt-1 rounded-xl`}>
                                        <FiMail className="mt-3 ml-2" />
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                        value={expertise}
                                        onChange={(e) => setExpertise(e.target.value)}
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
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
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
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                onClick={handleSave}
                                className="flex ml-2 mt-5 cursor-pointer py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                <FiSave className=" h-5 w-5 mt-0.5 ml-2 text-white" />
                                <p className=" ml-2 mr-2">Save Changes</p>
                            </button>
                            {success && (
                                <p className="text-green-500 mt-2 ml-2">
                                    Profile updated successfully!
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="mt-10 rounded-xl pr-5 bg-white ml-5 pb-10">
                                <div>
                                    <p className="mt-4 ml-10">Current Password</p>
                                    <div className={`flex border-1 w-100 ml-10 mt-1 rounded-xl`}>
                                        <FiLock className="mt-3 ml-2" />
                                        <input
                                            type={showPassword1 ? "text" : "password"}
                                            placeholder="password"
                                            className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                                            value={currentPassword}
                                            onChange={(e) => {
                                                setCurrentPassword(e.target.value);
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
                                    <p className="mt-4 ml-10">New Password</p>
                                    <div className={`flex border-1 w-100 ml-10 mt-1 rounded-xl`}>
                                        <FiLock className="mt-3 ml-2" />
                                        <input
                                            type={showPassword2 ? "text" : "password"}
                                            placeholder="password"
                                            className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                if (e.target.value === confirmPassword) {
                                                    setError("");
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
                                <div>
                                    <p className="mt-4 ml-10">Confirm Password</p>
                                    <div className={`flex border-1 w-100 ml-10 mt-1 rounded-xl `}>
                                        <FiLock className="mt-3 ml-2" />
                                        <input
                                            type={showPassword3 ? "text" : "password"}
                                            placeholder="password"
                                            className="h-10 ml-3 border-none outline-none focus:ring-0 focus:border-none w-87 "
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                const tt = e.target.value;
                                                setConfirmPassword(tt);

                                                if (tt !== newPassword) {
                                                    setError("Passwords do not match");
                                                } else {
                                                    setError("");
                                                }
                                            }}
                                        />
                                        <button
                                            className="mr-2.5"
                                            onClick={() => {
                                                setShowPassword3((showPassword3) => !showPassword3);
                                            }}
                                        >
                                            {showPassword3 ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                    <div>
                                        {error && <p className="text-red-500 mt-1 ml-10">{error}</p>}
                                    </div>
                                    <div>
                                        {changed && <p className="text-green-500 mt-1 ml-10">Passwords Changed Succesfully</p>}
                                    </div>
                                    <button
                                        onClick={handleSave2}
                                        className="flex ml-10 mt-5 cursor-pointer py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        <p className=" ml-2 mr-2">Update Password</p>
                                    </button>
                                </div>
                                <hr className="20 ml-7 text-gray-300 mt-5" />
                                <p className="ml-10 mt-5 font-semibold text-lg text-red-500">Danger Zone</p>
                                <div className="bg-red-100 p-4 rounded-lg mt-3 ml-10">
                                    <p className="text-red-700 font-medium">Delete Account</p>
                                    <p className="text-red-600 mt-2">Once you delete your account, there is no going back. Please be certain.</p>
                                    <button onClick={() => setShowDeleteModal(true)} className="mt-4 bg-red-600 text-white rounded-lg px-2 py-2 hover:bg-red-500 cursor-pointer">Delete Account</button>
                                </div>
                                {deleteError && <p className="text-red-500 mt-2 ml-10">{deleteError}</p>}

                            </div>
                            {showDeleteModal && (
                                <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-[2px] flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded-lg max-w-md mx-4 shadow-xl">
                                        <h3 className="text-lg font-bold text-red-600 mb-4">Delete Account</h3>
                                        <p className="mb-6 text-gray-700">
                                            Are you absolutely sure? This action cannot be undone and all your data will be permanently lost.
                                        </p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setShowDeleteModal(false)}
                                                className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowDeleteModal(false);
                                                    handleDelete();
                                                }}
                                                className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                            >
                                                Delete Forever
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>
        </>
    );
}
