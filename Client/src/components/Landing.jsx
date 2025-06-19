export default function Landing() {
    return (
        <div>
            <div>
                <p className="text-black ml-124 text-5xl font-bold mt-18 ">Learn Skills that Matter</p>
            <p className="mt-5 text-xl ml-95 text-gray-700">Discover thousands of courses taught by expert instructors. Learn at your own pace,</p>
            <p className="mt-0.5 text-xl ml-145 text-gray-700">anytime, anywhere with Gyaanquest.</p>
            </div>
            <div className="flex ml-145 mt-8">
                <button className="bg-black text-white px-4 py-2 rounded-lg w-45 text-lg font-medium h-15">Explore Courses</button>
                <button className="bg-white text-black px-4 py-2 rounded-lg w-45 text-lg font-medium h-15 ml-4 border-2 border-black">Start Teaching</button>
            </div>
        </div>
    );
}