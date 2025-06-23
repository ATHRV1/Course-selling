import { useEffect } from "react";
import CourseLand from "./CourseLand";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

export default function AllCourses() {
    const [courses, setCourses] = useState([]);
    const nav=useNavigate();

    useEffect(() => {
    async function fetch() {
        try {
            const token = localStorage.getItem('token');
            const config = {};
            
            if (token) {
                config.headers = {
                    token: token
                };
            }
            
            const res = await axios.get("http://localhost:3000/courses/all", config);
            setCourses(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }
    fetch();
}, [])
    return (
        <div>
            <p className="text-2xl font-bold ml-30 mt-10">All Courses</p>
            <div className="flex pl-8 pb-20">
                {courses.map((course) =>
                    <CourseLand key={course._id} enroll={() => nav("/user/course/view", {state: { course: course }})}  title={course.title} creator={course.instructor} rating={course.averageRating} users={course.totalEnrolled} duration={course.duration} price={course.price} />
                )}
            </div>
        </div>
    );
}