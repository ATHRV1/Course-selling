import './App.css';
import Nav from './components/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import UserSignup from './components/UserSignup';
import UserSignin from './components/UserSignin';
import CreatorSignup from './components/CreatorSignup';
import CreatorSignin from './components/CreatorSignin';
import CreatorDashboard from './components/CreatorDashboard';
import CreateCourse from './components/CreateCourse';
import CreatorCourseView from './components/CreatorCourseView';
import EditCourse from './components/EditCourse';
import CreatorProfile from './components/CreatorProfile';
import Landing from './components/Landing';
import CreatorLanding from './components/CreatorLanding';
import UserLanding from './components/UserLanding';
import UserProfile from './components/UserProfile';
import AllCourses from './components/AllCourses';
import UserCourseView from './components/UserCourseVeiw';


function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col w-screen min-h-screen bg-gray-50'>
        <Nav />
        <div className='flex-grow mt-18'>
          <Routes>
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/user/signin" element={<UserSignin />} />
            <Route path="/creator/signup" element={<CreatorSignup />} />
            <Route path="/creator/signin" element={<CreatorSignin />} />
            <Route path="/creator/dashboard" element={<CreatorDashboard />} />
            <Route path="/create/course" element={<CreateCourse />} />
            <Route path="/course/creator/view" element={<CreatorCourseView />} />
            <Route path="/edit/course" element={<EditCourse />} />
            <Route path="/creator/profile" element={<CreatorProfile />} />
            <Route path="/" element={<Landing />} />
            <Route path="/creator/landing" element={<CreatorLanding />} />
            <Route path="/user/landing" element={<UserLanding />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/all/courses" element={<AllCourses />} />
            <Route path="/user/course/view" element={<UserCourseView />} />
            {/* You can add more routes here */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
