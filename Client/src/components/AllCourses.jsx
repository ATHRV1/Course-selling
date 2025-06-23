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
            <div className="grid grid-cols-3 gap-x-0 gap-y-8 pl-29 pb-20">
                {courses.map((course) =>
                    <CourseLand 
                        key={course.courseId} 
                        enroll={() => nav("/user/course/view", {state: { course: course }})}  
                        title={course.title} 
                        creator={course.creatorName} 
                        rating={course.averageRating} 
                        users={course.totalEnrolled} 
                        duration={course.duration} 
                        price={course.price} 
                    />
                )}
            </div>
        </div>
    );
}