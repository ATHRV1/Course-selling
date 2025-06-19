import { BsFillStarFill } from "react-icons/bs";
import { FiClock, FiUsers } from "react-icons/fi";

export default function CourseLand({title, creator,rating,users,duration,price}){
    const getValue = (value) => {
        if (typeof value === 'object' && value?.$numberDecimal) {
            return parseFloat(value.$numberDecimal);
        }
        return value || 0;
    };

    const formattedRating = getValue(rating);
    return(
        <div className="rounded-xl bg-white w-95 ml-20 pb-6 mt-10 shadow-lg">
                <img
                    src="http://localhost:3000/public/images/courses/course-d.png"
                    alt=""
                    className="h-55 w-95 rounded-xl "
                />
                <div>
                    <p className="mt-5 ml-5 font-semibold text-lg">{title}</p>
                    <p className="mt-1 ml-5 text-sm">By {creator}</p>
                    <div className="flex mt-2">
                        <div className="flex">
                            <BsFillStarFill className="text-yellow-400 ml-5 mt-2" />
                            <p className="mt-0.5 ml-1">{formattedRating}</p>
                        </div>
                        <div className="flex">
                            <FiUsers className="text-gray-500 ml-5 mt-2" />
                            <p className="mt-0.5 ml-1">{users}</p>
                        </div>
                        <div className="flex">
                            <FiClock className="text-gray-500 ml-5 mt-2" />
                            <p className="mt-0.5 ml-1">{duration}</p>
                        </div>
                    </div>
                    <div className="flex mt-5">
                        <p className="text-xl text-black font-bold mt-1 ml-5">${price}</p>
                        <button className=" bg-black text-lg text-white w-35 h-10 cursor-pointer rounded-lg ml-35">
                            Enroll now
                        </button>
                    </div>
                </div>
            </div>
    );
}