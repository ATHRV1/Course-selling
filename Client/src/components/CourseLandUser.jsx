export default function CourseLandUser({title, category, level}) {
    return (
        <div className="rounded-xl bg-white w-95 ml-4 pb-6 mt-10 shadow-lg">
            <img
                src="http://localhost:3000/public/images/courses/course-d.png"
                alt=""
                className="h-55 w-95 rounded-xl "
            />
            <div>
                <p className="mt-5 ml-7 font-semibold text-lg">{title}</p>
                <div className="flex ml-4">
                    <p className="mt-0.5 ml-1">{category}</p>
                    <p className="mt-0.5 ml-2">{level}</p>
                </div>
            </div>
        </div>
    );
}