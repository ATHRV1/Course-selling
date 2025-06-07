import { IoBookOutline } from 'react-icons/io5';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div className='flex pt-4 shadow-sm pb-2'>
            <Link to="/">
            <div className="flex ml-30 pt-1"> 
                <IoBookOutline className="text-blue-600 w-10 h-10" />
                <h1 className='ml-2 text-2xl font-bold'>Gyaanquest</h1>
            </div>
            </Link>
            <div className='flex ml-70 pt-2.5'>
                <p className='text-lg text-gray-800 cursor-pointer'>Home</p>
                <p className='text-lg ml-3 text-gray-800 cursor-pointer'>Courses</p>
                <p className='text-lg ml-3 text-gray-800 cursor-pointer'>Categories</p>
                <p className='text-lg ml-7 text-gray-800 cursor-pointer'>Teach on VidyaCraft</p>
            </div>
            <div className='flex ml-65'>
                <BsCart className='mt-2.5 w-6 h-6' />
                <Link to="/user/signin">
                <button className=' pb-1 ml-2 border-1 border-gray-400 w-20 rounded-lg text-gray-800 cursor-pointer h-11'>Log in</button>
                </Link>
                <Link to="/user/signup">
                <button className=' pb-1 ml-2 border-1 border-gray-400 w-20 rounded-lg bg-blue-500 text-white cursor-pointer h-11'>Sign up</button>
                </Link>
            </div>
        </div>

    );
}