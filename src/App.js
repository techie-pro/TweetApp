import Navbar from './components/Navbar';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

import NotFound from './components/NotFound';
import ForgotPassword from './components/ForgotPassword';
import './App.css';
import Register from './components/Register';
import AllUsers from './components/AllUsers';
import MyTweets from './components/MyTweets';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/home' element={<HomePage />}></Route>
        <Route path='/allUsers' element={<AllUsers />}></Route>
        <Route path='/myTweets' element={<MyTweets />}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
