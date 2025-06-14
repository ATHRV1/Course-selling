import { FiDollarSign, FiStar, FiUsers } from "react-icons/fi";

export default function CourseCard({ img, title, users, rating, revenue, published, onClick }) {
    return (
        <div className="bg-white ml-5 rounded-xl mt-5 h-20 flex w-161 border border-gray-200 cursor-pointer" >
            <div className="w-16 h-16 rounded-xl mt-2 ml-2">
                <img src={img? img:null} alt="" />
            </div>
            <div className="flex-1">
                <p className="ml-2 mt-2 hover:underline w-fit" onClick={onClick}>{title}</p>
                <div className="flex mt-2">
                    <div className="flex">
                        <FiUsers className="text-gray-500 w-3.5 h-3.5 ml-2 mt-2" />
                        <p className="text-sm mt-1 ml-0.5">{users}</p>
                    </div>
                    <div className="flex">
                        <FiStar className="text-yellow-500 w-4.5 h-4.5 mt-1.5 ml-30" />
                        <p className="text-sm mt-1 ml-0.5">{rating}</p>
                    </div>
                    <div className="flex">
                        <FiDollarSign className="text-green-500 w-4 h-4 mt-1.5 ml-30" />
                        <p className="text-sm mt-1 ">{revenue}</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 mr-2">
                {published ? (
                    <div className="bg-green-100 text-green-700 h-5 rounded-xl w-19 pl-1.5 mt-3 ml-10 text-sm font-medium">
                        Published
                    </div>
                ) : (
                    <div className="bg-yellow-100 text-yellow-700 h-5 rounded-xl w-12 font-medium pl-1.5 mt-3 ml-10 text-sm">
                        Draft
                    </div>
                )}
                <div className="rounded-lg bg-black text-white h-8.5 w-17 text-md pl-2 pt-1 mt-6.5 ml-2 flex">
                    <svg
                                className="w-4 h-4 mr-1 mt-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                    Edit
                </div>
            </div>
        </div>
    );
}