import './App.css';
import Nav from './components/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import UserSignup from './components/UserSignup';
import UserSignin from './components/UserSignin';
import CreatorSignup from './components/CreatorSignup';
// import CreatorSignin from './CreatorSignin';
function App() {
  return(
    <BrowserRouter>
      <div className= 'flex flex-col w-screen min-h-screen'>
        <Nav />
        <div className='flex-grow'>
          <Routes>
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/user/signin" element={<UserSignin />} />
            <Route path="/creator/signup" element={<CreatorSignup />} />
            {/* <Route path="/creator/signin" element={<CreatorSignin />} /> */}
            {/* You can add more routes here */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
