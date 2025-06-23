import axios from "axios";
import { useEffect, useState } from "react";
import CourseLandUser from "./CourseLandUser";
import { useNavigate } from "react-router-dom";


export default function UserLanding() {
    const [username, setUsername] = useState("");
    const [courses, setCourses] = useState([]);
    const nav=useNavigate();

    useEffect(() => {
        async function fetch() {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.post("http://localhost:3000/user/info", {}, {
                    headers:
                    {
                        token: token,
                    }
                })
                console.log(res.data);
                setUsername(res.data.username);
                setCourses(res.data.courses);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, [])
    return (
        <div>
            <div className="bg-white pl-45 py-20">
                <p className="text-3xl font-bold">Welcome Back, {username}!</p>
                <p className="text-gray-600 mt-2">Continue your Learning Journey</p>
            </div>
            <p className="text-2xl ml-45 font-medium mt-10">Continue Learning</p>
            <div className="flex pl-38 pb-10">
                {courses.map((course) =>
                    <CourseLandUser key={course._id} title={course.title} category={course.category} level={course.level} />
                )}

            </div>
            <div className="bg-white pl-45 py-20">
                <p className="text-2xl font-medium">Browse Courses</p>
                <div className="flex mt-5">
                    <div onClick={()=>nav('/all/courses')} className="bg-gray-100 h-15 w-70 rounded-xl py-3.75 pl-14 text-lg hover:bg-gray-200 cursor-pointer">Web Developement</div>
                    <div onClick={()=>nav('/all/courses')} className="bg-gray-100 h-15 w-70 ml-4.5 rounded-xl py-3.75 pl-21 text-lg hover:bg-gray-200 cursor-pointer">Data Science</div>
                    <div onClick={()=>nav('/all/courses')} className="bg-gray-100 h-15 w-70 ml-4.5 rounded-xl py-3.75 pl-27 text-lg hover:bg-gray-200 cursor-pointer">Design</div>
                    <div onClick={()=>nav('/all/courses')} className="bg-gray-100 h-15 w-70 ml-4.5 rounded-xl py-3.75 pl-22 text-lg hover:bg-gray-200 cursor-pointer">Marketing</div>
                </div>
            </div>
        </div>
    );
}