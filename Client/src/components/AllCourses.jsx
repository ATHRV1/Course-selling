import { useEffect } from "react";
import CourseLand from "./CourseLand";
import axios from "axios";
import { useState } from "react";

export default function AllCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const res = await axios.get("http://localhost:3000/courses/all");
                console.log(res);
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
                    <CourseLand key={course._id} title={course.title} creator={course.instructor} rating={course.averageRating} users={course.enrolledCount} duration={course.duration} price={course.price} />
                )}
            </div>
        </div>
    );
}