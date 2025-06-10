import './App.css';
import Nav from './components/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import UserSignup from './components/UserSignup';
import UserSignin from './components/UserSignin';
import CreatorSignup from './components/CreatorSignup';
import CreatorSignin from './components/CreatorSignin';
import CreatorDashboard from './components/CreatorDashboard';
function App() {
  return(
    <BrowserRouter>
      <div className= 'flex flex-col w-screen min-h-screen bg-gray-50'>
        <Nav />
        <div className='flex-grow'>
          <Routes>
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/user/signin" element={<UserSignin />} />
            <Route path="/creator/signup" element={<CreatorSignup />} />
            <Route path="/creator/signin" element={<CreatorSignin />} />
            <Route path="/creator/dashboard" element={<CreatorDashboard />} />
            {/* You can add more routes here */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
