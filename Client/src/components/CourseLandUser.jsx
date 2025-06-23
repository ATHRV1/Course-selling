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
                <div className="flex ml-5 mt-1">
                    <p className="mt-0.5 ml-2 bg-gray-200 rounded-lg px-2 py-0.5">{category}</p>
                    <p className="mt-0.5 ml-2 bg-gray-200 rounded-lg px-2 py-0.5">{level}</p>
                </div>
            </div>
        </div>
    );
}